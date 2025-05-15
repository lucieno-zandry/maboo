<?php

namespace App\Http\Controllers;

use App\Actions\CategoryActions;
use App\Helpers\Helpers;
use App\Http\Requests\ArticleDestroyRequest;
use App\Http\Requests\ArticleStoreRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Models\Article;
use App\Models\Category;
use App\Models\Image;
use App\Models\Paragraph;
use App\Models\Product;
use App\Models\Section;
use App\Models\Subsection;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request, CategoryActions $categoryActions)
    {
        $product_id = $request->product_id;
        $category_id = $request->category_id;

        $articles = Article::withPagination()
            ->with([
                'category',
                'sections' => fn($query) => $query->with(['subsections' => fn($query) => $query->with('paragraphs')]),
                'images'
            ]);

        if ($product_id) {
            $product = Product::find($product_id);

            if ($product) {
                $categories_ids = [$product->category_id];
                $categoryActions->allChildrenIds($product->category_id, $categories_ids);

                if (!empty($categories_ids))
                    $articles->whereIn('category_id', $categories_ids);
            }
        } else if ($category_id) {
            $categories_ids = [$category_id];
            $categoryActions->allChildrenIds($category_id, $categories_ids);

            if (!empty($categories_ids))
                $articles->whereIn('category_id', $categories_ids);
        }

        return [
            'articles' => $articles->get()
        ];
    }

    public function store(ArticleStoreRequest $request)
    {
        $data = $request->validated();
        $article = Article::create($data);

        if (isset($data['sections']) && !empty($data['sections'])) {
            $sections = $data['sections'];

            foreach ($sections as $sectionData) {
                $sectionData['article_id'] = $article->id;
                $section = Section::create($sectionData);

                if (isset($sectionData['subsections']) && !empty($sectionData['subsections'])) {
                    $subsections = $sectionData['subsections'];

                    foreach ($subsections as $subsectionData) {
                        $subsectionData['section_id'] = $section->id;
                        $subsection = Subsection::create($subsectionData);

                        if (isset($subsectionData['paragraphs']) && !empty($subsectionData['paragraphs'])) {
                            $paragraphs = $subsectionData['paragraphs'];

                            foreach ($paragraphs as $paragraphData) {
                                $paragraphData['subsection_id'] = $subsection->id;
                                $paragraph = Paragraph::create($paragraphData);

                                if (
                                    !$subsection->paragraphs->some(function ($item) use ($paragraph) {
                                        return $item->id === $paragraph->id;
                                    })
                                )
                                    $subsection->paragraphs->push($paragraph);
                            }
                        }

                        if (
                            !$section->subsections->some(function ($item) use ($subsection) {
                                return $item->id === $subsection->id;
                            })
                        )
                            $section->subsections->push($subsection);
                    }
                }

                if (
                    !$article->sections->some(function ($item) use ($section) {
                        return $item->id === $section->id;
                    })
                )
                    $article->sections->push($section);
            }
        }

        if ($request->has('images')) {
            $images = new Collection();

            foreach ($data['images'] as $image_data) {
                $image_data['url'] = Helpers::store_uploaded_file($image_data['url'], ['folder' => 'articles']);
                $image_data['article_id'] = $article->id;
                $image = Image::create($image_data);
                $images->add($image);
            }

            $article->setAttribute('images', $images);
        }

        return [
            'article' => $article
        ];
    }

    public function update(ArticleUpdateRequest $request, Article $article)
    {
        $data = $request->validated();
        $article->update(attributes: $data);

        return [
            'article' => $article
        ];
    }

    public function destroy(ArticleDestroyRequest $request)
    {
        $ids = explode(',', $request->articles_ids);
        $deleted = Article::whereIn('id', $ids)->delete();

        return [
            'deleted' => $deleted
        ];
    }
}

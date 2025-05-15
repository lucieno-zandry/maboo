<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\ParagraphCreateRequest;
use App\Http\Requests\Article\ParagraphDeleteRequest;
use App\Http\Requests\Article\ParagraphUpdateRequest;
use App\Models\Paragraph;
use Illuminate\Http\Request;

class ParagraphController extends Controller
{
        public function store(ParagraphCreateRequest $request): array
    {
        $data = $request->validated();
        $paragraph = Paragraph::create($data);

        return [
            'paragraph' => $paragraph
        ];
    }

    public function update(ParagraphUpdateRequest $request, Paragraph $paragraph)
    {
        $data = $request->validated();

        $paragraph->update($data);

        return [
            'paragraph' => $paragraph
        ];
    }

    public function index(Request $request)
    {
        $section_id = $request->section_id;

        $paragraphs = Paragraph::withPagination();

        if ($section_id)
            $paragraphs = $paragraphs->where('section_id', $section_id);

        $paragraphs = $paragraphs->get();

        return [
            'paragraphs' => $paragraphs
        ];
    }

    public function destroy(ParagraphDeleteRequest $request)
    {
        $ids = explode(',', $request->paragraphs_ids);
        $deleted = Paragraph::whereIn('id', $ids)->delete();

        return [
            'deleted' => $deleted
        ];
    }
}

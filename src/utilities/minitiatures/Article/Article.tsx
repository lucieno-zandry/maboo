import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Section, { SectionProps } from './Section/Section';
import { ImageProps } from './Image/Image';
import { getCategoryProducts } from '../../api/actions';
import Fade from '../Fade/Fade';
import HoverableProduct, { HoverableProductPlaceholder } from '../HoverableProduct/HoverableProduct';
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";


interface ArticleProps {
  id: number;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  sections: SectionProps[];
  images: ImageProps[];
}

const Article: React.FC<ArticleProps> = ({ title, author, created_at, category_id, sections, images }) => {
  // INTEGRATION CATEGORIE
  const id = category_id;

  // Récupérer l'ID de l'article depuis l'URL
  const { articleId } = useParams();

  // Créer une référence pour l'élément article
  const articleRef = useRef<HTMLDivElement>(null);


  // État local pour les produits et le chargement
  const [state, setState] = React.useState({
      products: [],
      isLoading: true,
      hasError: false
  });

  React.useEffect(() => {
    // Fonction pour charger les produits similaires
    const loadRelatedProducts = async () => {
      try {
        // Simulation d'un appel API
        // const response = await getProductsByCategory(article.category_id, 5);
        const response = await getCategoryProducts(id, {
            offset: 0,
            limit: 5,
        });
        setState({
            products: response.data.products,
            isLoading: false,
            hasError: false
        });
      } catch (error) {
        console.error('Erreur lors du chargement des produits similaires:', error);
        setState({
            products: [],
            isLoading: false,
            hasError: true
        });
      }
    };

    loadRelatedProducts();
  }, [category_id]);

  // Effet pour faire défiler jusqu'à l'article si l'ID correspond
  useEffect(() => {
    // Vérifier si l'ID de l'article correspond à celui de l'URL
    if (articleId && id.toString() === articleId) {
      // Faire défiler jusqu'à cet article avec une animation fluide
      articleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [articleId, id]);

  // Si erreur, on ne montre rien
  if (state.hasError) {
      return null;
  }

  return (
    <div className='article' ref={articleRef}>
      <div className="article-header">
        <h1>{title}</h1>
        <div className="article-meta">
          <p>Par {author}</p>
          <p>Publié le: {new Date(created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Première section */}
        {sections.length > 0 && (
          <Section key={sections[0].id} {...sections[0]} />
        )}
        {/* Images */}
        <div className="images-container">
          {images.map((image) => (
            <img key={image.id} src={image.url} alt={image.caption || ""} />
          ))}
        </div>
        {/* Sections restantes */}
        <div className="remaining-sections">
          {sections.slice(1).map((section) => (
            <Section key={section.id} {...section} />
          ))}
        </div>
      </div>

      <div className="section-information">
        <h5 className="display-6">
          Nos produits connexes à ce blog
        </h5>
        <p className="section-description">
          Avec un soin méticuleux, nous avons sélectionné spécialement pour vous ces produits exceptionnels.
          Chaque article a été choisi avec une attention particulière pour répondre à vos besoins et à vos goûts uniques.
        </p>
      </div>


      {/* Produits similaires */}
      <div className="related-products-container">
        <h3>Produits similaires</h3>

        {/* Affichage des produits */}
        <Fade show={Boolean(state.products.length > 0)} className="spacing">
          {state.products.map((product, key) => (
            <HoverableProduct
              product={product}
              key={key}
            />
          ))}
        </Fade>

        {/* État de chargement */}
        <Fade show={state.isLoading} className="spacing">
          {[...Array(5)].map((_, key) => (
            <HoverableProductPlaceholder
              key={key}
              index={key}
            />
          ))}
        </Fade>

        {/* Message si aucun produit */}
        <Fade show={!state.isLoading && state.products.length === 0}>
          <ProductsEmpty />
        </Fade>
      </div>



    </div>
  )
}

export default Article;

// import React from 'react';
import Section, { SectionProps } from './Section/Section';
import { ImageProps } from './Image/Image';
import React from 'react';
import { getCategoryProducts } from '../../api/actions';
import Fade from '../Fade/Fade';
import HoverableProduct, { HoverableProductPlaceholder } from '../HoverableProduct/HoverableProduct';
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";


// import React, { useState } from 'react';
// import { Share, Heart } from 'lucide-react';
// import './ProductPage.scss';


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

  // Si erreur, on ne montre rien
  if (state.hasError) {
      return null;
  }

  return (
    <div className='article'>
      <h1>{title}</h1>
      <p>By {author}</p>
      <p>Created at: {new Date(created_at).toLocaleDateString()}</p>
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
      {images.map((image) => (
        <img key={image.id} src={image.url} alt={image.caption} />
      ))}



      <div className="section-information">
        <h5 className="display-6">
          Nos produits connexe à cette article 
        </h5>
        <p className="section-description">
          Avec un soin méticuleux, nous avons sélectionné spécialement pour vous ces produits exceptionnels.
          Chaque article a été choisi avec une attention particulière pour répondre à vos besoins et à vos goûts uniques
        </p>
      </div>


        {/* test */}
        <div className="related-products-container">
            <h3>Produits similaires</h3>
            
            {/* Affichage des produits */}
            <Fade show={Boolean(state.products.length > 0)} className="d-flex flex-nowrap gap-4">
                {state.products.map((product, key) => (
                    <HoverableProduct 
                        product={product} 
                        key={key}
                        className="flex-1" // Pour répartir également l'espace
                    />
                ))}
            </Fade>

            {/* État de chargement */}
            <Fade show={state.isLoading} className="d-flex flex-nowrap gap-4">
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

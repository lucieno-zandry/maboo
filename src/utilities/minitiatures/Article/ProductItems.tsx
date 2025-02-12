// import React from 'react';
// import Section, { SectionProps } from './Section/Section';
// import { ImageProps } from './Image/Image';


import React, { useState } from 'react';
import { Share, Heart } from 'lucide-react';
import './ProductPage.scss';


// interface ArticleProps {
//   id: number;
//   title: string;
//   author: string;
//   created_at: string;
//   updated_at: string;
//   sections: SectionProps[];
//   images: ImageProps[];
// }

const ProductItems: React.FC = ({ }) => {


  const [selectedSize, setSelectedSize] = useState('180x120x0.5cm');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const imagesA = [
    '/path-to-image-1.jpg',
    '/path-to-image-2.jpg',
    '/path-to-image-3.jpg',
  ];

  const sizes = [
    '200x180x0.5cm',
    '180x150x0.5cm',
    '180x120x0.5cm',
    '180x120x1cm',
    '180x150x1cm'
  ];

  return (
    <div className='article'>
      {/* <h1>{title}</h1>
      <p>By {author}</p>
      <p>Created at: {new Date(created_at).toLocaleDateString()}</p>
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
      {images.map((image) => (
        <img key={image.id} src={image.url} alt={image.caption} />
      ))} */}



      {/* MODIF BEGIN */}
      <div className="product-page">
        <div className="product-container">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={imagesA[selectedImage]} alt="Tapis de jeu" />
              <span className="shipping-badge">Ship in 18 hours</span>
            </div>
            <div className="thumbnail-grid">
              {imagesA.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1>Tapis de jeu pour bébés, 200x180cm/180x150cm</h1>
            
            <div className="price-info">
              <span className="current-price">US $9.98</span>
              <span className="original-price">US $16.10</span>
              <span className="discount">-38%</span>
            </div>

            <div className="tax-info">
              Prix hors taxe -8% suppl. avec les pièces
            </div>

            <div className="promo-banner">
              Choisissez 2 articles et obtenez -1%
            </div>

            <div className="rating-section">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
                <span className="rating-value">4.4</span>
              </div>
              <span className="reviews">47 Avis</span>
              <span className="sales">+500 vendus</span>
            </div>

            <div className="seller-info">
              <div className="seller">
                Vendu par <span>HSYB Children T...(Commerçant)</span>
              </div>
              
              <div className="shipping">
                <span>Livré vers </span>
                <span>Madagascar</span>
              </div>
            </div>

            <div className="size-selection">
              <h3>Taille: {selectedSize}</h3>
              <div className="size-grid">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <span>Quantité:</span>
              <div className="quantity-input">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) setQuantity(val);
                  }}
                />
                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
              <span className="stock">955 disponibles</span>
            </div>

            <div className="action-buttons">
              <button className="buy-now">Acheter maintenant</button>
              <button className="add-to-cart">Ajouter au panier</button>
            </div>

            <div className="social-actions">
              <button className="share">
                <Share size={20} />
                <span>Partager</span>
              </button>
              <button className="favorite">
                <Heart size={20} />
                <span>1286</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODIF END */}



    </div>
  )
}

export default ProductItems;

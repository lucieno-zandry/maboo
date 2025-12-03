import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RelatedArticles.scss';

interface Article {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < articles.length - 2 ? prevIndex + 1 : prevIndex));
  };

  const handleArticleClick = (articleId: number) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="related-articles">
      <h2>Articles associés</h2>
      <div className="carousel-container">
        <button className="arrow left" onClick={handlePrev} disabled={currentIndex === 0}>
          &#8249;
        </button>
        <div className="articles-container-connexe">
          {articles.slice(currentIndex, currentIndex + 2).map((article) => (
            <div key={article.id} className="article-card" 
              onClick={() => handleArticleClick(article.id)}>
              <div className="image-container-connexe">
                <img src={article.imageUrl} alt="test"/>
              </div>
              <div className="article-info">
                <h3>{article.name}</h3>
                <p>{article.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={handleNext} disabled={currentIndex >= articles.length - 2}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default RelatedArticles;

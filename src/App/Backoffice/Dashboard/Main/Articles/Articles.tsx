import React from 'react';
import ArticlesList from './ArticlesList/ArticlesList';
import AddArticle from './AddArticle/AddArticle';

const articles = [
    {
        id: 1,
        title: "The Wonders of Madagascar",
        author: "Jane Doe",
        created_at: "2025-01-16T10:00:00Z",
        updated_at: "2025-01-16T10:00:00Z"
    },
    {
        id: 2,
        title: "Exploring the Rainforests",
        author: "John Smith",
        created_at: "2025-01-15T09:00:00Z",
        updated_at: "2025-01-15T09:00:00Z"
    }
];

const Articles: React.FC = () => {
    return <div className='articles-container'>
        <AddArticle />
        <ArticlesList articles={articles} />;
    </div>
};

export default Articles;

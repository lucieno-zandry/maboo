import React from 'react';
import Fade from '../../../../../../utilities/minitiatures/Fade/Fade';

interface Article {
    id: number;
    title: string;
    author: string;
    created_at: string;
    updated_at: string;
}

export interface ArticlesListProps {
    articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
    return (
        <Fade className='table-responsive' show>
            <table className="articles-list-container table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.author}</td>
                            <td>{new Date(article.created_at).toLocaleDateString()}</td>
                            <td>{new Date(article.updated_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fade>
    );
};

export default ArticlesList;

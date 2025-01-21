import React from 'react';
import Article from '../../../utilities/minitiatures/Article/Article';

const articleData = {
    id: 1,
    title: "The Wonders of Madagascar",
    author: "Jane Doe",
    created_at: "2025-01-16T10:00:00Z",
    updated_at: "2025-01-16T10:00:00Z",
    sections: [
        {
            id: 1,
            title: "Introduction",
            order: 1,
            subsections: [
                {
                    id: 1,
                    title: "Overview",
                    order: 1,
                    paragraphs: [
                        {
                            id: 1,
                            content: "Madagascar is an island nation located off the southeastern coast of Africa. It is known for its unique wildlife and biodiversity."
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Wildlife",
            order: 2,
            subsections: [
                {
                    id: 2,
                    title: "Lemurs",
                    order: 1,
                    paragraphs: [
                        {
                            id: 2,
                            content: "Madagascar is home to many species of lemurs, which are found nowhere else in the world."
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Chameleons",
                    order: 2,
                    paragraphs: [
                        {
                            id: 3,
                            content: "The island is also famous for its diverse species of chameleons."
                        }
                    ]
                }
            ]
        }
    ],
    images: [
        {
            id: 1,
            url: "https://example.com/images/madagascar.jpg",
            caption: "Beautiful landscape of Madagascar",
            order: 1
        }
    ]
};

const Articles: React.FC = () => {
    return <div className='articles-container container'>
        <Article {...articleData} />;
    </div>
};

export default Articles;

import React from 'react';
import Article from '../../../utilities/minitiatures/Article/Article';


const articleDatas = [
    {
    id: 1,
    title: "The Wonders of Madagascar",
    author: "Jane Doe",
    created_at: "2025-01-16T10:00:00Z",
    updated_at: "2025-01-16T10:00:00Z",
    category_id: 1,
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
}
,{
    id: 2,
    title: "Etre maman",
    author: "Joe Doe",
    created_at: "2025-01-16T10:00:00Z",
    updated_at: "2025-01-16T10:00:00Z",
    category_id: 2,
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
}]


// Service pour récupérer les produits
// const getProductsByCategory = async (categoryId: number, limit: number) => {
//     try {
//         // Remplacer par votre appel API réel
//         const response = await axios.get(`/api/products`, {
//             params: {
//                 categoryId,
//                 limit
//             }
//         });
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };


const Articles = React.memo(() => {


    return (
    <div className='article-container-main'>
        <div className='articles-container container'>
        {
            articleDatas.map((articleData, key)   =>  
                <Article {...articleData} key={key} />
            )

        }
        </div>
        
        {/* <ProductItems></ProductItems> */}       

    </div>
    
    
)
});

export default Articles;

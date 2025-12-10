import React from 'react';
import Article from '../../../utilities/minitiatures/Article/Article';
import './Articles.scss';
import { articleDatas } from './articlesData';


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
            articleDatas.map((articleData, key) =>
                <Article {...articleData} key={key} />
            )
        }
        </div>
    </div>
)
});

export default Articles;

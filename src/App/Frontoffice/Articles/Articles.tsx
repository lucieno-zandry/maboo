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
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/614007/img_placeholder_1034x432.png",
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
                            content: "A recent Scout study carried out by Mediahub found that young people love to re-watch action movies from the past. With that in mind, we’re taking a look at some of the best movies from the decade that put the genre on the map: the 1980s. The following are therefore films that hit big at the time and continue to influence writers, actors, and directors to this day."
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
                    title: "RAIDERS OF THE LOST ARK (1981)",
                    order: 1,
                    paragraphs: [
                        {
                            id: 2,
                            content: "Combing their love of the 1930s serials with an affection for James Bond, George Lucas and Steven Spielberg came up with archeologist, treasure hunter, and soldier of fortune Indiana Jones. Played with effortless charm by Harrison Ford, his first adventure found “Indy” competing with the Nazis to find the fabled Ark of the Covenant. The film combed action, adventure, romance, drama, and a dash of horror in irresistible fashion. So much so that Indy returned in three more flicks, with another apparently on its way. But there were far more pretenders to his fedora, with the intervening years filled with rip-offs — some good (Romancing the Stone, National Treasure, Tomb Raider, The Mummy) and some bad (High Road to China, Sahara, Sky Pirates, Jungle Raiders)."
                        }
                    ]
                },
                {
                    id: 3,
                    title: "MAD MAX 2 (1981)",
                    order: 2,
                    paragraphs: [
                        {
                            id: 3,
                            content: "If the original Mad Max was a film about the title character losing his humanity, this sequel — retitled The Road Warrior in America — saw him regain it, with Max helping to protect a peaceful community of settlers against a gang of violent marauders. But the power of Mad Max 2 isn’t in its plot. Instead, it comes from the film’s look — a post-apocalyptic punk aesthetic that has influenced everything from video games (Fallout) and festivals (Burning Man) to comic book characters (Tank Girl) and music videos (Phil Collins’ “Don’t Lose My Number“). Then there’s the action itself, with much of the movie an adrenalin-fuelled chase sequence that has been aped and copied ever since. But the only film that has come close to matching it for insane stunts and onscreen carnage is the belated sequel, Mad Max: Fury Road."
                        }
                    ]
                }
            ]
        }
    ],
    images: [
        {
            id: 1,
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/614007/img_placeholder_1034x432.png",
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

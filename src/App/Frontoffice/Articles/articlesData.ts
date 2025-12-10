export interface ArticleSection {
    id: number;
    title: string;
    order: number;
    subsections: {
        id: number;
        title: string;
        order: number;
        paragraphs: {
            id: number;
            content: string;
        }[];
    }[];
}

export interface ArticleImage {
    id: number;
    url: string;
    caption: string;
    order: number;
}

export interface ArticleData {
    id: number;
    title: string;
    author: string;
    created_at: string;
    updated_at: string;
    category_id: number;
    sections: ArticleSection[];
    images: ArticleImage[];
}

export const articleDatas: ArticleData[] = [
    {
        id: 1,
        title: "Le développement de bébé : les étapes clés de la première année",
        author: "Dr. Sophie Martin",
        created_at: "2023-06-15T10:00:00Z",
        updated_at: "2023-06-15T10:00:00Z",
        category_id: 1,
        sections: [
            {
                id: 1,
                title: "Introduction",
                order: 1,
                subsections: [
                    {
                        id: 1,
                        title: "Les merveilles de la première année",
                        order: 1,
                        paragraphs: [
                            {
                                id: 1,
                                content: "La première année de vie d'un bébé est remplie de moments magiques et de développements extraordinaires. Chaque mois apporte son lot de nouvelles compétences et de découvertes fascinantes, tant pour le bébé que pour les parents qui l'accompagnent dans cette aventure."
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "Les étapes du développement",
                order: 2,
                subsections: [
                    {
                        id: 2,
                        title: "0-3 mois : Le temps de l'adaptation",
                        order: 1,
                        paragraphs: [
                            {
                                id: 2,
                                content: "Durant les trois premiers mois, bébé s'adapte à son nouvel environnement. Il commence à reconnaître les visages, particulièrement celui de sa mère, et réagit aux sons familiers. Ses réflexes primitifs, comme la succion et l'agrippement, sont très présents. Vers la fin de cette période, les premiers sourires sociaux apparaissent, créant des moments de connexion profonde avec les parents."
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: "4-6 mois : L'éveil aux sens",
                        order: 2,
                        paragraphs: [
                            {
                                id: 3,
                                content: "Entre 4 et 6 mois, bébé développe considérablement sa coordination. Il commence à tenir sa tête, à se retourner et à s'asseoir avec soutien. C'est aussi la période où il découvre ses mains et commence à saisir volontairement les objets. Son intérêt pour le monde extérieur grandit, et il devient plus expressif, riant aux éclats et babillant joyeusement."
                            }
                        ]
                    }
                ]
            }
        ],
        images: [
            {
                id: 1,
                url: "https://images.pexels.com/photos/3875220/pexels-photo-3875220.jpeg?auto=format&fit=crop&w=1034&h=432&q=80",
                caption: "Les étapes du développement de bébé",
                order: 1
            }
        ]
    },
    {
        id: 2,
        title: "Être maman : trouver l'équilibre entre maternité et bien-être personnel",
        author: "Marie Dubois",
        created_at: "2023-08-22T10:00:00Z",
        updated_at: "2023-08-22T10:00:00Z",
        category_id: 2,
        sections: [
            {
                id: 1,
                title: "Introduction",
                order: 1,
                subsections: [
                    {
                        id: 1,
                        title: "La maternité, un voyage transformateur",
                        order: 1,
                        paragraphs: [
                            {
                                id: 1,
                                content: "Devenir mère est l'une des expériences les plus transformatrices dans la vie d'une femme. Ce nouveau rôle apporte une joie immense, mais aussi des défis considérables. Trouver un équilibre entre prendre soin de son enfant et préserver son bien-être personnel est essentiel pour une maternité épanouie."
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "Prendre soin de soi",
                order: 2,
                subsections: [
                    {
                        id: 2,
                        title: "L'importance du self-care",
                        order: 1,
                        paragraphs: [
                            {
                                id: 2,
                                content: "Prendre du temps pour soi n'est pas un luxe mais une nécessité. Même quelques minutes par jour consacrées à une activité qui vous ressource peuvent faire une grande différence. Que ce soit lire un livre, prendre un bain, méditer ou simplement savourer une tasse de thé en paix, ces moments sont précieux pour recharger vos batteries et être plus présente pour votre enfant."
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: "Créer un réseau de soutien",
                        order: 2,
                        paragraphs: [
                            {
                                id: 3,
                                content: "Aucune maman ne devrait se sentir seule dans son parcours. Entourez-vous de personnes bienveillantes qui peuvent vous offrir un soutien pratique et émotionnel. Rejoindre des groupes de mamans, partager vos expériences avec d'autres parents ou simplement accepter l'aide proposée par vos proches peut alléger considérablement votre charge mentale et physique."
                            }
                        ]
                    }
                ]
            }
        ],
        images: [
            {
                id: 1,
                url: "https://images.pexels.com/photos/3763583/pexels-photo-3763583.jpeg?auto=format&fit=crop&w=1034&h=432&q=80",
                caption: "L'équilibre entre maternité et bien-être personnel",
                order: 1
            }
        ]
    }
];

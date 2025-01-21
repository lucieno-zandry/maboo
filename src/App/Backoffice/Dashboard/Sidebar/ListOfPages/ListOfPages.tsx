import React from "react";
import ListOfPage from "../ListOfpage/ListOfPage";
import userType from "../../../../../utilities/helpers/userType";

const adminOnlyPages = [
    {
        title: 'Catégories',
        path: '/categories',
        icon: 'fa-solid fa-list-timeline'
    },
]

const pages = [
    {
        title: 'Dashboard',
        path: '',
        icon: 'fa fa-home'
    },
    {
        title: 'Produits',
        path: '/products',
        icon: 'fa-light fa-list-dropdown'
    },
    {
        title: 'Articles',
        path: '/articles',
        icon: 'fa-light fa-newspaper'
    }
];

const ListOfPages = React.memo(() => {
    return <div className="list-of-pages">
        {pages.map((page, key) => {
            return <ListOfPage {...page} key={key} />
        })}

        {userType() === "admin" && adminOnlyPages.map((page, key) => {
            return <ListOfPage {...page} key={key} />
        })}
    </div>
});

export default ListOfPages;
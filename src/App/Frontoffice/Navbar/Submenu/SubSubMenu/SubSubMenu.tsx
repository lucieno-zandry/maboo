import React from "react";
import { CategoriesHierarchy } from "../../../../../utilities/constants/types";
import { Link } from "react-router-dom";
import categoryPathname from "../../../../../utilities/helpers/categoryPathname";

type Props = {
    categories: CategoriesHierarchy
}

const SubSubMenu = React.memo((props: Props) => {
    const { categories } = props;

    return <ul>
        {categories.map((hierarchy, key) => {
            return <li key={key}>
                <Link className="btn" to={categoryPathname(hierarchy.category.id)}>{hierarchy.category.name}</Link>
            </li>
        })}
    </ul>
})

export default SubSubMenu;
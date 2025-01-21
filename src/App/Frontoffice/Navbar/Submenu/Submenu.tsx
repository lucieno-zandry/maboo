import React from "react";
import { CategoriesHierarchy } from "../../../../utilities/constants/types";
import SubSubMenu from "./SubSubMenu/SubSubMenu";
import { Link } from "react-router-dom";
import categoryPathname from "../../../../utilities/helpers/categoryPathname";

type Props = {
    categories: CategoriesHierarchy
}

const Submenu = React.memo((props: Props) => {
    const { categories } = props;

    return <div className="submenu-container">
        {categories.map((hierarchy, key) => {
            return <div className="submenu-item" key={key}>
                <Link className="sub-category-title btn" to={categoryPathname(hierarchy.category.id)}>{hierarchy.category.name}</Link>
                {(hierarchy.children.length > 0) && <SubSubMenu categories={hierarchy.children} />}
            </div>
        })}
    </div>
})

export default Submenu;
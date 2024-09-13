import React from "react";
import Submenu from "../Submenu/Submenu";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import { refreshCategories } from "../../../../utilities/redux/frontoffice/frontofficeSlice";
import categoryPathname from "../../../../utilities/helpers/categoryPathname";

const NavItems = React.memo(() => {
    const categories = useSelector((state: Rootstate) => state.frontoffice.categories);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    React.useEffect(() => {
        if (!categories) {
            dispatch(refreshCategories());
        }
    }, [categories]);

    return <ul className="navbar-nav me-auto mt-2 mt-lg-0">
        <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' && 'active'}`} to="/">Home</Link>
        </li>

        {categories && categories.map((hierarchy, key) => {
            const pathname = categoryPathname(hierarchy.category.id);

            return <li className="nav-item" key={key}>
                <Link
                    className={`nav-link ${pathname === location.pathname && 'active'}`}
                    to={pathname}>
                    {hierarchy.category.name} <i className="fa fa-chevron-down"></i>
                </Link>
                {hierarchy.children.length > 0 &&
                    <Submenu
                        categories={hierarchy.children} />}
            </li>
        })}
    </ul>
});
export default NavItems;
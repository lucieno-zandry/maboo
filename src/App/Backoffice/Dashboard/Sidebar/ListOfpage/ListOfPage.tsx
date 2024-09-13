import React from "react";
import { Link, useLocation } from "react-router-dom";
import userType from "../../../../../utilities/helpers/userType";

type Props = {
    title: string,
    path: string,
    icon: string,
    className?: string,
}

const ListOfPage = React.memo((props: Props) => {
    const { icon, path, title, className = '' } = props;
    const location = useLocation();

    const pathname = React.useMemo(() => `/${userType()}/dashboard${path}`, [path]);
    const isActive = React.useMemo(() => location.pathname === pathname, [location.pathname, pathname]);

    return <div className={`list-of-page ${className}`}>
        <Link
            to={pathname}
            className={`page-link ${isActive && 'active'}`}>{title} <i className={icon}></i>
        </Link>
    </div>
});
export default ListOfPage;
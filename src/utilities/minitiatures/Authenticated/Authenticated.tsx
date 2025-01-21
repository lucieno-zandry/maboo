import React from "react";
import { Outlet } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
import useAuth from "../../hooks/useAuth";

const Authenticated = React.memo(() => {
    const user = useAuth().auth;
    useRedirect(true);

    if (user !== false && user !== null) {
        return <Outlet />
    }
});

export default Authenticated;
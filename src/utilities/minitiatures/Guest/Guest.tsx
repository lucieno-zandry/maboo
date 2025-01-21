import React from "react";
import { Outlet } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
import useAuth from "../../hooks/useAuth";

const Guest = React.memo(() => {
    const user = useAuth().auth;
    useRedirect(false);

    if (user === false) {
        return <Outlet />
    }
});

export default Guest;
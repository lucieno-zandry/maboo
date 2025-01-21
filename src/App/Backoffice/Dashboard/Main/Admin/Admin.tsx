import React from "react";
import { Outlet } from "react-router-dom";

const Admins = React.memo(() => {
    return <div className="admins-container">
        <Outlet />
    </div>
});

export default Admins;
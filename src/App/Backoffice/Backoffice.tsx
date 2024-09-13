import React from "react";
import { Outlet } from "react-router-dom";

const Backoffice = React.memo(() => {
    return <div className="backoffice-container">
        <Outlet />
    </div>
});

export default Backoffice;
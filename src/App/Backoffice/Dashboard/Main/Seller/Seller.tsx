import React from "react";
import { Outlet } from "react-router-dom";

const Seller = React.memo(() => {
    return <div className="seller-container">
        <Outlet />
    </div>
});

export default Seller;
import React from "react";
import { Outlet } from "react-router-dom";


const Orders = React.memo(() => {
    return <div className="orders-container">
        <h3><i className="fa-solid fa-cart-flatbed-boxes"></i> Commandes</h3>
        <Outlet />
    </div>
})

export default Orders;
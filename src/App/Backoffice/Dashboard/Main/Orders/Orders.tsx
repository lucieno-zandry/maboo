import React from "react";
import { Outlet } from "react-router-dom";

const Orders = React.memo(() => {
    return <Outlet />
})

export default Orders;
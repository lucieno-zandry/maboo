import React from "react";
import { Outlet } from "react-router-dom";

const User = React.memo(() => {
    return <div className="user-container">
        <Outlet />
    </div>
});

export default User;
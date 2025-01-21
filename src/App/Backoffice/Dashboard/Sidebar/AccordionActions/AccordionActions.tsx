import React from "react";
import { Accordion } from "react-bootstrap";
import SellerCollapse from "./SellerCollapse/SellerCollapse";
import AdminCollapse from "./AdminCollapse/AdminCollapse";
import OrderCollapse from "./OrderCollapse/OrderCollapse";
import userType from "../../../../../utilities/helpers/userType";

const AccordionActions = React.memo(() => {
    return <div className="accordion-actions-container">
        <Accordion>
            {userType() === "admin" && <>
                <SellerCollapse />
                <AdminCollapse />
            </>}
            <OrderCollapse />
        </Accordion>
    </div>
})

export default AccordionActions;
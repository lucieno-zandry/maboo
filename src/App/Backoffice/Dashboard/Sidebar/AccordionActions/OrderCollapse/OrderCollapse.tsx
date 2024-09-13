import React from "react";
import { Accordion } from "react-bootstrap";
import ListOfPage from "../../ListOfpage/ListOfPage";
import userType from "../../../../../../utilities/helpers/userType";

const OrderCollapse = React.memo(() => {
    return <Accordion.Item eventKey="2">
        <Accordion.Button>
            Commandes
        </Accordion.Button>
        <Accordion.Collapse eventKey="2">
            <>
                {userType() === "admin" &&
                    <ListOfPage
                        icon="fa-solid fa-seal-question"
                        path="/orders/unchecked"
                        title="Non vérifié"
                        className="px-3 py-2" />}

                <ListOfPage
                    icon="fa-solid fa-hourglass-end"
                    path="/orders/processing"
                    title="En cours"
                    className="px-3 py-2" />

                <ListOfPage
                    icon="fa-solid fa-check"
                    path="/orders/delivered"
                    title="Livrées"
                    className="px-3 py-2" />
            </>
        </Accordion.Collapse>
    </Accordion.Item>
});

export default OrderCollapse;
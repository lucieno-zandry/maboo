import React from "react";
import { Accordion } from "react-bootstrap";
import ListOfPage from "../../ListOfpage/ListOfPage";

const SellerCollapse = React.memo(() => {
    return <Accordion.Item eventKey="0">
        <Accordion.Button>
            Vendeurs
        </Accordion.Button>
        <Accordion.Collapse eventKey="0">
            <div>
                <ListOfPage
                    icon="fa-regular fa-inboxes"
                    path="/sellers/requests"
                    title="Requêtes"
                    className="p-3" />
                <ListOfPage
                    icon="fa-regular fa-users"
                    path="/sellers/management"
                    title="Gestion"
                    className="p-3" />
            </div>
        </Accordion.Collapse>
    </Accordion.Item>
});

export default SellerCollapse;
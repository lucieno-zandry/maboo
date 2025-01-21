import React from "react";
import { Accordion } from "react-bootstrap";
import ListOfPage from "../../ListOfpage/ListOfPage";

const AdminCollapse = React.memo(() => {
    return <Accordion.Item eventKey="1">
        <Accordion.Button>
            Administrateurs
        </Accordion.Button>
        <Accordion.Collapse eventKey="1">
            <ListOfPage
                icon="fa-regular fa-inboxes"
                path="/admins/requests"
                title="Requêtes"
                className="p-3"/>
        </Accordion.Collapse>
    </Accordion.Item>
});


export default AdminCollapse;
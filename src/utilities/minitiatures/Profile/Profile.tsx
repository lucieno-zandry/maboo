import React from "react";
import Overview from "./Overview/Overview";
import Private from "./Private/Private";
import Public from "./Public/Public";
import { Accordion } from "react-bootstrap";
import Connection from "./Connection/Connection";
import Fade from "../Fade/Fade";

const Profile = React.memo(() => {

    return <Fade className="container profile-container" show>
        <Overview />
        <Accordion className="profile-accordion">
            <Accordion.Item eventKey="0">
                <Accordion.Button>
                    <span>
                        <i className="fa-solid fa-circle-info"></i> Informations publiques.
                    </span>
                </Accordion.Button>
                <Accordion.Collapse eventKey="0">
                    <Public />
                </Accordion.Collapse>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Button>
                    <span>
                        <i className="fa-solid fa-file-lock"></i> Informations Privées
                    </span>
                </Accordion.Button>
                <Accordion.Collapse eventKey="1">
                    <Private />
                </Accordion.Collapse>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Button>
                    <span>
                        <i className="fa-solid fa-key-skeleton-left-right"></i>Connexion
                    </span>
                </Accordion.Button>
                <Accordion.Collapse eventKey="2">
                    <Connection />
                </Accordion.Collapse>
            </Accordion.Item>
        </Accordion>
    </Fade>
});

export default Profile;
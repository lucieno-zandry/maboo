import React from "react";
import { Dropdown } from "react-bootstrap";
import image from './empty-notification.png';

const EmptyNotification = React.memo(() => {
    return <Dropdown.ItemText className="empty-notification">
        <img src={image} width='100' height='100'/>
        <h5>Vous n'avez aucune notification</h5>
    </Dropdown.ItemText>
});

export default EmptyNotification;
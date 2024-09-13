import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Notification, NotificationData } from "../../../constants/types";
import { useNotification } from "../Notification";
import toFormatedDateString from "../../../helpers/toFormatedDateString";
import { readNotification } from "../../../api/actions";

type Props = {
    notification: Notification,
}

const NotificationItem = React.memo((props: Props) => {
    const { actions } = useNotification();

    const { notification } = props;

    const { line, action, title, icon } = JSON.parse(notification.data) as NotificationData;
    const { read_at, created_at } = notification;

    const className = React.useMemo(() => {
        let className = "notification-item";
        if (read_at) className += " read";
        return className;
    }, [read_at]);

    const handleRead = React.useCallback(() => {
        if (!read_at) {
            readNotification(notification.id)
                .then(() => {
                    actions.refreshAllNotifications();
                    actions.refreshUnreadNotifications();
                })
        }
    }, [read_at, notification.id]);

    return <Dropdown.Item
        as={Link}
        to={action}
        className={className}
        onClick={handleRead}>
        <small className="info">
            {toFormatedDateString(created_at)}
        </small>
        <div className="content">
            <i className={icon}></i>
            <div>
                <h6>{title}</h6>
                <p>{line}</p>
            </div>
        </div>
    </Dropdown.Item>
})

export const NotificationItemPlaceHolder = React.memo(() => {
    return <Dropdown.ItemText
        className="placeholder-glow notification-item">
        <div className="info placeholder"></div>
        <div className="content placeholder"></div>
    </Dropdown.ItemText>
});

export default NotificationItem;
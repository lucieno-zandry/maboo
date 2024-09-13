import React from "react";
import { Dropdown } from "react-bootstrap";
import NotificationItem, { NotificationItemPlaceHolder } from "./NotificationItem/NotificationItem";
import EmptyNotification from "./EmptyNotification/EmptyNotification";
import generateArray from "../../helpers/generateArray";
import * as Types from "../../constants/types";
import { allNotifications, unreadNotifications } from "../../api/actions";
import useNotificationWs from "../../hooks/useNotificationWs";
import useAuth from "../../hooks/useAuth";

const DEFAULT_ACTIONS = {
    refreshUnreadNotifications: () => { },
    refreshAllNotifications: () => { },
};

const NotificationContext = React.createContext({
    actions: DEFAULT_ACTIONS,
});

export const useNotification = () => {
    return React.useContext(NotificationContext);
}

const Notification = React.memo(() => {
    const { auth } = useAuth();

    const [notifications, setNotifications] = React.useState({
        all: null as Types.Notification[] | null,
        unread: null as Types.Notification[] | null,
    });

    const { all, unread } = notifications;

    const refreshUnreadNotifications = React.useCallback(() => {
        unreadNotifications()
            .then(response => {
                setNotifications(notifications => ({
                    ...notifications, unread: response.data.notifications
                }));
            })
    }, []);

    const refreshAllNotifications = React.useCallback(() => {
        allNotifications()
            .then(response => {
                setNotifications(notifications => ({
                    ...notifications, all: response.data.notifications
                }));
            })
    }, []);

    React.useEffect(() => {
        if (!auth) {
            return;
        }

        if (!unread) {
            refreshUnreadNotifications();
        } else if (!all) {
            refreshAllNotifications();
        }
    }, [
        unread,
        all,
        auth,
        refreshAllNotifications,
        refreshUnreadNotifications
    ]);

    const contextValue = React.useMemo(() => ({
        actions: {
            refreshUnreadNotifications,
            refreshAllNotifications,
        }
    }), [refreshAllNotifications, refreshUnreadNotifications]);

    useNotificationWs({
        refreshUnreadNotifications,
        refreshAllNotifications
    });

    if (auth) {
        return <NotificationContext.Provider value={contextValue}>
            <Dropdown className="actions-dropdown notification-dropdown">
                <Dropdown.Toggle variant=''>
                    <i className="fa fa-bell"></i> {Boolean(unread?.length) && <small className="count">
                        {unread?.length}
                    </small>}
                </Dropdown.Toggle>
                <Dropdown.Menu align='end'>
                    {Boolean(all?.length)
                        && all?.map((notification, key) => <NotificationItem
                            notification={notification}
                            key={key}
                        />)}

                    {!all && generateArray(3).map((value, key) => {
                        value;
                        return <NotificationItemPlaceHolder key={key} />;
                    })}

                    {Boolean(all && all.length === 0) && <EmptyNotification />}
                </Dropdown.Menu>
            </Dropdown>
        </NotificationContext.Provider>
    }
});

export default Notification;
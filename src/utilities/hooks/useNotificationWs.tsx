import React from "react";
import { getWstoken } from "../api/actions";
import useToasts from "../minitiatures/Toast/hooks/useToasts";
import useAuth from "./useAuth";

const BASE_URL = import.meta.env.VITE_APP_NOTIFICATION_WS_URL;
const DEFAULT_STATE = {
    token: '',
    connection: null as WebSocket | null,
}
const TENTATIVES_LIMIT = 10;
let tentatives = 0;

export default function (actions: {
    refreshUnreadNotifications: Function,
    refreshAllNotifications: Function,
}) {
    const toasts = useToasts();
    const { auth } = useAuth();
    const [state, setState] = React.useState(DEFAULT_STATE);

    const getWebsocketInstance = React.useCallback(() => state.token ?
        new WebSocket(`${BASE_URL}/${state.token}`) :
        null, [state.token]);

    const handleClose = React.useCallback(() => {
        console.log('notification connection closed');
        if (auth) {
            const connection = getWebsocketInstance();
            if (connection && tentatives < TENTATIVES_LIMIT) {
                initConnection(connection);
                console.log('notification connection refreshed');
            };
        }
    }, [auth]);

    const handleMessage = React.useCallback((e: MessageEvent<string>) => {
        const { title, line } = JSON.parse(e.data);

        actions.refreshUnreadNotifications();
        actions.refreshAllNotifications();

        toasts.push({
            title,
            content: line,
            type: "default",
        })
    }, [toasts.push, actions]);

    const handleOpen = React.useCallback((e: Event) => {
        e;
        console.log('notification connection established');
    }, []);

    const handleError = React.useCallback((e: Event) => {
        console.log('notification connection error', e);
    }, []);

    function initConnection(connection: WebSocket) {
        connection.onopen = handleOpen;
        connection.onmessage = handleMessage;
        connection.onclose = handleClose;
        connection.onerror = handleError;

        tentatives++;
        setState(s => ({ ...s, connection }));
    }

    React.useEffect(() => {
        if (auth && !state.token) {
            getWstoken()
                .then(response => {
                    setState(s => ({ ...s, token: response.data.token }));
                })
        }
    }, [state.token, auth]);

    React.useEffect(() => {
        if (state.token && !state.connection) {
            const connection = getWebsocketInstance();
            connection && initConnection(connection);
        }

        return () => {
            if (state.connection) {
                state.connection.close();
                setState(DEFAULT_STATE)
            };
        }
    }, [state.token, state.connection]);
}
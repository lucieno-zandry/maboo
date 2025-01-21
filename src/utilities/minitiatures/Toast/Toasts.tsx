import { GlobalsContext } from "../../globals/GlobalsProvider";
import React from "react";
import useToasts from "./hooks/useToasts";
import useWatchRedirections from "./hooks/useWatchRedirections";
import { AnimatePresence, motion } from "framer-motion";

export type Toast = {
    id?: string,
    title: string,
    content: string | React.JSX.Element,
    type: 'default' | 'success' | 'danger',
    duration?: number
};

export type ToastList = Toast[];

export type ToastRef = {
    current: typeof defaultToast
}

const TOASTPREFIX = 'toast-item-';
const LEAVINGDURATION = 500;

const icon = (toastType: Toast['type']): React.JSX.Element => {
    switch (toastType) {

        case 'success':
            return <i className="fa fa-check-circle"></i>

        case 'danger':
            return <i className="fa fa-exclamation-circle"></i>;

        default:
            return <i className="fa fa-bell"></i>;
    }
};

export const defaultToast = {
    pop: (id: string) => { id },
    push: (toast: Toast) => { toast }
}

const ToastItem = React.memo((props: Toast) => {
    const { content, title, id, type = "default", duration } = props;
    const [visible, setVisible] = React.useState(true);
    const { pop } = useToasts();

    let visibleTimeout: number | null;
    let popTimeout: number | null;

    const clearTimeouts = React.useCallback(() => {
        visibleTimeout && clearTimeout(visibleTimeout);
        popTimeout && clearTimeout(popTimeout);
    }, []);

    const handleClose = React.useCallback(() => {
        clearTimeouts();
        setVisible(false);

        popTimeout = setTimeout(() => {
            pop(id!);
        }, (LEAVINGDURATION));
    }, [id, pop, clearTimeouts]);

    React.useEffect(() => {
        visibleTimeout = setTimeout(() => {
            setVisible(false);
        }, (duration! - LEAVINGDURATION));

        popTimeout = setTimeout(() => {
            pop(id!);
        }, duration);

        return clearTimeouts;
    }, [duration, pop, id]);


    return <AnimatePresence>
        {visible && <motion.div
            className={`toast-item ${type}`}
            id={id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}>
            <div className="toast-header">
                <h5>{icon(type)} {title}</h5>
                <button
                    className="btn"
                    onClick={handleClose}>
                    <i className="fa fa-close"></i>
                </button>
            </div>
            <div className="toast-body">
                <p>{content}</p>
            </div>
        </motion.div>}
    </AnimatePresence>
});

const Toasts = React.memo(() => {
    const [toasts, setToasts] = React.useState([] as ToastList);
    const { toastRef } = React.useContext(GlobalsContext);


    const pop = React.useCallback((id: string) => {
        setToasts(t => [...t].filter(toast => toast.id !== id));
    }, []);

    const push = React.useCallback((toast: Toast) => {
        const id = TOASTPREFIX + (toast.id || Math.round((Math.random() * 100000)));
        const type = toast.type || "default";
        const duration = toast.duration || 6000;

        setToasts(t => [...t, { ...toast, id, type, duration }]);
    }, []);

    toastRef.current = React.useMemo(() => ({
        push,
        pop
    }), [push, pop]);

    useWatchRedirections(push);

    if (toasts.length > 0) {
        return <div className="toast-container">
            {toasts.map(toast => <ToastItem {...toast} key={toast.id} />)}
        </div>
    }
});

export default Toasts;
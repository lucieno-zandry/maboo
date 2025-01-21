import React from "react";
import { Order } from "../../../../utilities/constants/types";
import transactionState from "../../../../utilities/helpers/transactionState";
import toFormatedDateString from "../../../../utilities/helpers/toFormatedDateString";
import Items from "../Items/Items";
import Button from "../../../../utilities/minitiatures/Button/Button";
import { Link } from "react-router-dom";
import usePagePreloader from "../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { deleteOrder } from "../../../../utilities/api/customer/actions";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";

type Props = {
    order: Order,
    onDeleteSuccess: Function,
}

const OrderItemsGroup = React.memo((props: Props) => {
    const pagePreloader = usePagePreloader();
    const toasts = useToasts();
    const { order, onDeleteSuccess} = props;

    const handleDeleteOrder = React.useCallback(() => {
        pagePreloader.enable();
        deleteOrder(order.id)
            .then(() => {
                toasts.push({
                    title: "Commande supprimée",
                    content: "La commande a été supprimée avec succès",
                    type: "success",
                });

                onDeleteSuccess();
            })
            .catch(() => {
                toasts.push({
                    title: "Suppression échouée",
                    content: "Impossible de supprimer la commande, veuillez réessayer plus tard",
                    type: "danger",
                })
            })
            .finally(() => {
                pagePreloader.disable();
            })
    }, [order.id, toasts.push, pagePreloader]);

    return <div className="order-items-group-container">
        <div className="order-items-group-header">
            <div className="left-side">
                Etat: <span
                    className="order-state">
                    {transactionState(order.transaction)}
                </span> <span className="order-date">
                    {toFormatedDateString(order.created_at)}
                </span>
            </div>
            <div className="right-side">
                {(!order.transaction || order.transaction.status !== "SUCCESS") &&
                    <Link type="button" to={`/orders/order/${order.id}`} className="btn btn-outline-primary">Acheter</Link>}
                <Button
                    type="button"
                    className="btn"
                    onClick={handleDeleteOrder}>
                    <i className="fa fa-xmark"></i>
                </Button>
            </div>
        </div>
        <Items
            order={order}
            className="order-section"/>
    </div>
});

export default OrderItemsGroup;
import React from "react";
import { Dropdown } from "react-bootstrap";
import toFormatedDateString from "../../../../../../../utilities/helpers/toFormatedDateString";
import { BackOfficeOrder } from "../../../../../../../utilities/constants/types";
import Price from "../../../../../../../utilities/minitiatures/Price/Price";
import { markOrderAsCancelled, markOrderAsConfirmed } from "../../../../../../../utilities/api/admin/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { refreshUncheckedOrders } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import usePagePreloader from "../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";


type Props = {
    order: BackOfficeOrder,
}

const OrderHeader = React.memo((props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();
    const loader = usePagePreloader();

    const { order } = props;

    const handleVerify = React.useCallback(() => {
        loader.enable();

        markOrderAsConfirmed(order.id)
            .then(() => {
                dispatch(refreshUncheckedOrders());
                toasts.push({
                    title: "Commande confirmée",
                    content: "La commande a été déplacée vers la section ''en attente''.",
                    type: "success",
                })
            })
            .catch(() => {
                toasts.push({
                    title: "Impossible de confirmer la commande",
                    content: "Une erreur s'est produite lors de la confirmation de la commande",
                    type: "danger",
                })
            })
            .finally(() => {
                loader.disable();
            });
    }, [order.id, toasts.push, loader.disable]);

    const handleCancel = React.useCallback(() => {
        loader.enable();

        markOrderAsCancelled(order.id)
            .then(() => {
                dispatch(refreshUncheckedOrders());
                toasts.push({
                    title: "Commande annulée",
                    content: "La commande a été supprimée de votre liste",
                    type: "success",
                })
            })
            .catch(() => {
                toasts.push({
                    title: "Impossible d'annuler la commande",
                    content: "Une erreur s'est produite lors de l'annulation de la commande",
                    type: "danger",
                })
            })
            .finally(() => {
                loader.disable();
            });
    }, [order.id, loader.disable, toasts.push]);

    return <div>
        <div className="d-flex justify-content-between">
            <h5 className="section-title">
                Commande:
            </h5>
            <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    Marquer comme
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        className="btn btn-primary"
                        onClick={handleVerify}>
                        <i className="fa fa-check-circle"></i> Vérifié
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="text-danger"
                        onClick={handleCancel}>
                        <i className="fa fa-xmark"></i> Non Payé
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className="order-info">
            <div className="order-total">
                Total: <Price amount={order.total_price} className="order-price" />
            </div>
            <div className="order-date">
                Date: <span>
                    {toFormatedDateString(order.created_at)}
                </span>
            </div>
        </div>
    </div>
})

export default OrderHeader;
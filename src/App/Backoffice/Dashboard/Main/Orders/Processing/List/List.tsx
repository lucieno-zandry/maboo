import React from "react";
import { BackOfficeOrderItem } from "../../../../../../../utilities/constants/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import OrderItemComponent from "../../../../../../../utilities/minitiatures/OrderItemComponent/OrderItemComponent";
import { useFilterRow } from "../../../../../../../utilities/hooks/admin/useFilterRow";
import { Dropdown } from "react-bootstrap";
import valuesOf from "../../../../../../../utilities/helpers/valuesOf";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import usePagePreloader from "../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { refreshProcessingOrders } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import { markOrderItemsAsDelivered } from "../../../../../../../utilities/api/actions";

const List = React.memo(() => {
    const { processing } = useSelector((state: Rootstate) => state.backoffice.order);
    const dispatch = useDispatch<AppDispatch>();
    const filter = useFilterRow();
    const toasts = useToasts();
    const loader = usePagePreloader();

    const [state, setState] = React.useState({
        selected: [] as BackOfficeOrderItem[],
    });

    const addToSelected = React.useCallback((orderItem: BackOfficeOrderItem) => {
        setState(state => {
            const newState = { ...state };
            newState.selected.push(orderItem);
            return newState;
        })
    }, []);

    const removeFromSelected = React.useCallback((id: number) => {
        setState(state => {
            const filtered = state.selected.filter(orderItem => orderItem.id !== id);
            return ({ ...state, selected: filtered });
        })
    }, []);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, orderItem: BackOfficeOrderItem) => {
        const { checked } = e.target;
        checked ? addToSelected(orderItem) : removeFromSelected(orderItem.id);
    }, []);

    const handleSelectAll = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (processing) {
            setState(s => ({ ...s, selected: checked ? processing : [] }));
        }
    }, [processing]);

    const handleMarkAsDelivered = React.useCallback(() => {
        if (state.selected.length > 0) {
            const ids = valuesOf<number>('id', state.selected);
            loader.enable();
            const newState = { ...state };
            markOrderItemsAsDelivered(ids)
                .then(() => {
                    newState.selected = [];
                    toasts.push({
                        title: "Commande(s) livrée(s)",
                        content: "Les commandes ont été marquées comme livrées",
                        type: "success",
                    });

                    dispatch(refreshProcessingOrders());
                })
                .catch(() => {
                    toasts.push({
                        title: "Une erreur s'est produite",
                        content: "Impossible de mettre à jour le statut de cette commande, veuillez réessayer plus tard",
                        type: "danger",
                    });
                })
                .finally(() => {
                    loader.disable();
                    setState(newState);
                });
        }
    }, [state, toasts.push]);

    if (processing && processing.length > 0) {
        return <>
            <div className="d-flex justify-content-between align-items-center processing-order-list-header">
                <Checkbox
                    label="Tout"
                    checked={state.selected.length === processing?.length}
                    onChange={handleSelectAll} />

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" disabled={state.selected.length === 0}>
                        Marquer comme
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={handleMarkAsDelivered}>
                            <i className="fa fa-check-circle"></i> Livré
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-flex gap-4 flex-column">
                {processing?.map(orderItem => {
                    const row = <div key={orderItem.id} className="d-flex gap-4">
                        <Checkbox
                            label=''
                            checked={state.selected.some(item => item.id === orderItem.id)}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, orderItem)
                            }
                            className="align-self-center" />

                        <OrderItemComponent
                            orderItem={orderItem}
                            className="m-0" />
                    </div>

                    return filter([
                        orderItem.cart_item.product.title,
                        orderItem.cart_item.product.description,
                        orderItem.user.firstname,
                        orderItem.user.name,
                        orderItem.user.email,
                        orderItem.user.phone_number,
                        orderItem.cart_item.subtotal,
                        orderItem.cart_item.product_variant?.name || '',
                    ], row);
                })}
            </div>
        </>
    }
});

export default List;
import React from "react";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import OrderItemsGroup from "../../OrderItemsGroup/OrderItemsGroup";
import { refreshCancelledOrders } from "../../../../../utilities/redux/frontoffice/frontofficeSlice";

const List = React.memo(() => {
    const { cancelled } = useSelector((state: Rootstate) => state.frontoffice.orders);
    const show = React.useMemo(() => Boolean(cancelled && cancelled.length > 0), [cancelled]);
    const dispatch = useDispatch<AppDispatch>();

    return <Fade show={show}>
        {show &&
            cancelled?.map(
                (order, key) => <OrderItemsGroup
                    order={order}
                    key={key}
                    onDeleteSuccess={() => dispatch(refreshCancelledOrders())} />
            )}
    </Fade>
});

export default List;
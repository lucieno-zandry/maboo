import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../utilities/redux/store";
import { refreshDeliveredOrders } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import OrdersEmpty from "../OrdersEmpty/OrdersEmpty";
import Loading from "../../../../../../utilities/minitiatures/Loading/Loading";

const Delivered = React.memo(() => {
    const { delivered } = useSelector((state: Rootstate) => state.backoffice.order);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!delivered) {
            dispatch(refreshDeliveredOrders());
        }
    }, [delivered]);

    console.log('render');

    return <div className="delivered-order-container">
        <OrdersEmpty show={Boolean(delivered && delivered.length === 0)} />
        <Loading show={!delivered} />
    </div>
})

export default Delivered;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import EmptyOrders from "../EmptyOrders/EmptyOrders";
import Loading from "../../../../utilities/minitiatures/Loading/Loading";
import List from "./List/List";
import { refreshDeliveredOrders } from "../../../../utilities/redux/frontoffice/frontofficeSlice";

const Delivered = React.memo(() => {
    const { delivered } = useSelector((state: Rootstate) => state.frontoffice.orders);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!delivered) {
            dispatch(refreshDeliveredOrders());
        }
    }, [delivered]);

    return <div className="delivered-orders">
        <EmptyOrders show={Boolean(delivered && delivered.length === 0)} />
        <Loading show={!delivered} />
        <List />
    </div>
});

export default Delivered;
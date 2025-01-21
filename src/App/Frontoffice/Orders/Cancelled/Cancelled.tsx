import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import { refreshCancelledOrders } from "../../../../utilities/redux/frontoffice/frontofficeSlice";
import EmptyOrders from "../EmptyOrders/EmptyOrders";
import Loading from "../../../../utilities/minitiatures/Loading/Loading";
import List from "./List/List";

const Cancelled = React.memo(() => {
    const { cancelled } = useSelector((state: Rootstate) => state.frontoffice.orders);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!cancelled) {
            dispatch(refreshCancelledOrders());
        }
    }, [cancelled]);

    return <div className="cancelled-orders">
        <EmptyOrders show={Boolean(cancelled && cancelled.length === 0)} />
        <Loading show={!cancelled} />
        <List />
    </div>
});

export default Cancelled;
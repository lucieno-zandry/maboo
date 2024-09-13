import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../../utilities/redux/store";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import OrderItemComponent from "../../../../../utilities/minitiatures/OrderItemComponent/OrderItemComponent";

const List = React.memo(() => {
    const { delivered } = useSelector((state: Rootstate) => state.frontoffice.orders);
    const show = React.useMemo(() => Boolean(delivered && delivered.length > 0), [delivered]);

    return <Fade className="delivered-list pt-4" show={show}>
        {show && delivered?.map(orderItem => {
            return <OrderItemComponent orderItem={orderItem} key={orderItem.id} />
        })}
    </Fade>
})

export default List;
import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../../utilities/redux/store";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import OrderItemComponent from "../../../../../utilities/minitiatures/OrderItemComponent/OrderItemComponent";

const List = React.memo(() => {
    const { processing } = useSelector((state: Rootstate) => state.frontoffice.orders);
    const show = React.useMemo(() => Boolean(processing && processing.length > 0), [processing]);

    return <Fade className="processing-list pt-4" show={show}>
        {show && processing?.map(orderItem => {
            return <OrderItemComponent orderItem={orderItem} key={orderItem.id} />
        })}
    </Fade>
})

export default List;
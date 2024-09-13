import React from "react";
import { BackOfficeOrder } from "../../../../../../utilities/constants/types";
import { useFilterRow } from "../../../../../../utilities/hooks/admin/useFilterRow";
import OrderHeader from "./OrderHeader/OrderHeader";
import OrderContent from "./OrderContent/OrderContent";

type Props = {
    order: BackOfficeOrder,
}

const OrderItemGroup = React.memo((props: Props) => {
    const { order } = props;
    const { user } = order;
    const filter = useFilterRow();

    const orderItemGroup = <div className="order-item-group">
        <OrderHeader order={order} />
        <OrderContent order={order} />
    </div>

    return filter(
        [
            user.adress,
            user.email,
            user.firstname,
            user.name,
            order.total_price,
        ],
        orderItemGroup
    );
});

export default OrderItemGroup;
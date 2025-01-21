import React from "react";
import { Order } from "../../../../utilities/constants/types";
import OrderItemComponent from "../../../../utilities/minitiatures/OrderItemComponent/OrderItemComponent";

type Props = {
  order: Order,
  className?: string,
};

const Items = React.memo(({ order, className = '' }: Props) => {
  return (
    <div className={`items-container ${className}`}>
      <div className="order-section-title">Articles</div>
      {order.order_items.map((orderItem) => <OrderItemComponent
        orderItem={orderItem}
        key={orderItem.id} />)}
    </div>
  );
});

export default Items;

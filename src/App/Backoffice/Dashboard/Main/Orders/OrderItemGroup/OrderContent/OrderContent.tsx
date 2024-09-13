import React from "react";
import { Accordion } from "react-bootstrap";
import appImage from "../../../../../../../utilities/helpers/appImage";
import RoundedImage from "../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import OrderItemComponent from "../../../../../../../utilities/minitiatures/OrderItemComponent/OrderItemComponent";
import { BackOfficeOrder } from "../../../../../../../utilities/constants/types";

type Props = {
    order: BackOfficeOrder,
}

const OrderContent = React.memo((props: Props) => {
    const { order } = props;
    const { user } = order;

    return <div className="order-item-group">
        <Accordion>
            <Accordion.Item eventKey={`accordion-user-${order.id}`}>
                <Accordion.Button className="section-title">
                    Utilisateur
                </Accordion.Button>
                <Accordion.Collapse className="buyer-info p-3" eventKey={`accordion-user-${order.id}`}>
                    <>
                        <RoundedImage image={appImage(user.image)} />
                        <div>{user.email}</div>
                        <div>{user.name} {user.firstname}</div>
                    </>
                </Accordion.Collapse>
            </Accordion.Item>
            <Accordion.Item eventKey={`accordion-items-${order.id}`}>
                <Accordion.Button>
                    Articles
                </Accordion.Button>
                <Accordion.Collapse eventKey={`accordion-items-${order.id}`} className="p-3">
                    <>
                        {order.order_items.map(orderItem => <OrderItemComponent
                            key={orderItem.id}
                            orderItem={orderItem} />
                        )}
                    </>
                </Accordion.Collapse>
            </Accordion.Item>
        </Accordion>
    </div>
})

export default OrderContent;
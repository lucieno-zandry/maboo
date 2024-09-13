import React from "react";
import { OrderItem } from "../../constants/types";
import { fakeCartItem } from "../../constants/fakes";
import SquaredImage from "../SquaredImage/SquaredImage";
import appImage from "../../helpers/appImage";
import SmallText from "../SmallText/SmallText";
import Price from "../Price/Price";
import ProductMerchant from "../ProductMerchant/ProductMerchant";

type Props = {
  orderItem: OrderItem,
  className?: string,
}

const OrderItemComponent = React.memo((props: Props) => {

  const { className = '' } = props;
  const item = props.orderItem.cart_item || fakeCartItem;
  const { product } = item;
  const image = item.product_variant?.image || product.images[0]?.name;

  return <div key={item.id} className={`item-row ${className}`}>
    <SquaredImage image={appImage(image)} />
    <div>
      <h6 className="product-title">
        {product.title}{" "}
        {item.product_variant && `- ${item.product_variant.name}`}
      </h6>
      <div className="product-description">
        <SmallText isExtendable={false} maxLength={50}>
          {product.description}
        </SmallText>
      </div>
      <Price amount={item.subtotal} />
      <div>
        <span className="item-subtitle">quantité:</span>{" "}
        <span>{item.quantity}</span>
      </div>
      <div className="d-flex gap-1 align-items-center">
        <span className="item-subtitle">marchand: </span>{" "}
        <ProductMerchant
          merchant={product.merchant}
          showImage={false}
        />
      </div>
    </div>
  </div>
});

export default OrderItemComponent;
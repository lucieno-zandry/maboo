import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rootstate } from "../../../../utilities/redux/store";
import SmallText from "../../../../utilities/minitiatures/SmallText/SmallText";
import CountButton from "../../../../utilities/minitiatures/CountButton/CountButton";
import Button from "../../../../utilities/minitiatures/Button/Button";
import DoublePrice from "../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import ProductMerchant from "../../../../utilities/minitiatures/ProductMerchant/ProductMerchant";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import {
  Payload,
  useAddToCart,
} from "../../../../utilities/api/customer/hooks";
import ProductVariants from "./ProductVariants/ProductVariants";
import { ProductVariant } from "../../../../utilities/constants/types";

const RightSide = React.memo(() => {
  const addToCart = useAddToCart();
  const slug = useParams().slug!;
  const product = useSelector(
    (state: Rootstate) => state.frontoffice.products[slug]!
  );

  const defaultVariant = React.useMemo(() => {
    if (product.variants.length > 0) {
      return product.variants[0];
    }

    return null;
  }, [product.variants]) as ProductVariant | null;

  const [state, setState] = React.useState({
    count: 1,
    loading: false,
    variant: defaultVariant,
  });

  const handleCountChange = React.useCallback((count: number) => {
    setState((s) => ({ ...s, count }));
  }, []);

  const handleAddToCart = React.useCallback(() => {
    const payload = {
      product_id: product.id,
      quantity: state.count,
    } as Payload;

    if (state.variant) {
      payload.product_variant_id = state.variant.id;
    }

    addToCart({
      payload,
      onInit: () => setState((s) => ({ ...s, loading: true })),
      onFinally: () => setState((s) => ({ ...s, loading: false })),
      product_slug: product.slug,
    });
  }, [product.id, state.count, state.variant, product.slug]);

  const price = React.useMemo(() => {
    const others = state.variant?.price || product.sale_price;
    const current = others || product.price;

    if (state.count > 1) {
      return current * state.count;
    }

    return others || undefined;
  }, [state.count, state.variant, product.sale_price, product.price]);

  const maxCount = React.useMemo(() => {
    if (state.variant) {
      return state.variant.inStock;
    }

    return product.inStock;
  }, [state.variant, product.inStock]);

  const handleVariantChange = React.useCallback(
    (variant: ProductVariant) => {
      const newState = { ...state };

      if (state.count > variant.inStock) newState.count = 1;
      newState.variant = variant;

      setState(newState);
    },
    [state]
  );

  return (
    <Fade className="right-side-container" show>
      <div className="product-hierarchy">
        {`${product.category?.name} / ${product.title}`}
      </div>

      <div className="product-title">{product.title}</div>

      <div className="product-description">
        <SmallText maxLength={200} isExtendable>
          {product.description}
        </SmallText>
      </div>

      <DoublePrice firstPrice={product.price} secondPrice={price} />

      <div className="d-flex gap-3">
        <CountButton
          count={state.count}
          onChange={handleCountChange}
          max={maxCount}
          className="col-5"
        />

        <Button
          type="button"
          className="btn btn-outline-dark btn-sm col"
          onClick={handleAddToCart}
          options={{ loading: state.loading }}
          disabled={state.count > maxCount}
        >
          <i className="fa fa-cart-plus"></i> Ajouter au panier
        </Button>
      </div>

      <ProductVariants onChange={handleVariantChange} active={state.variant} />

      <div className="product-merchant">
        <h6>Marchand: </h6>
        <ProductMerchant merchant={product.merchant} />
      </div>
    </Fade>
  );
});

export default RightSide;

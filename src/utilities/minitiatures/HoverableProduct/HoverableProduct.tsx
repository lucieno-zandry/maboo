import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../constants/types";
import appImage from "../../helpers/appImage";
import DoublePrice from "../DoublePrice/DoublePrice";
import Button from "../Button/Button";
import { useAddToCart } from "../../api/customer/hooks";

type Props = {
    product: Product,
    className?: string
};

type Payload = {
    product_id: number,
    quantity: number,
    product_variant_id?: number
};

const HoverableProduct = React.memo((props: Props) => {
    const addToCart = useAddToCart();
    const { product, className = '' } = React.useMemo(() => props, [props]);

    const [state, setState] = React.useState({
        loading: false,
    });

    const payload = React.useMemo(() => {
        const payload: Payload = {
            product_id: product.id,
            quantity: 1,
        }

        if (product.variants.length > 0) {
            payload.product_variant_id = product.variants[0].id
        }

        return payload;
    }, [product.id, product.variants]);

    const price = React.useMemo(() => {
        const price = {
            firstPrice: product.price,
            secondPrice: product.sale_price || undefined
        };

        if (product.variants.length > 0) {
            const variant = product.variants[0];
            price.firstPrice = (product.price > variant.price) ? product.price : variant.price;
            price.secondPrice = (product.price > variant.price) ? variant.price : undefined;
        }

        return price;
    }, [product]);

    const handleAddToCart = React.useCallback(() => {
        addToCart({
            payload,
            onInit: () => setState(s => ({ ...s, loading: true })),
            onFinally: () => setState(s => ({ ...s, loading: false })),
            product_slug: product.slug,
        })
    }, [product.id, payload, product.slug]);

    return <div className={"hoverable-product " + className}>
        <div className="product-image-container">
            <div className="curtain">
                <div className="curtain-actions">
                    <Link
                        type="button"
                        className="btn btn-outline-dark btn-sm pt-2"
                        tabIndex={-1}
                        data-bs-toggle='tooltip'
                        title='Voir le produit'
                        to={'/product/' + product.slug}>
                        <i className="fa fa-eye"></i>
                    </Link>
                    <Button
                        type="button"
                        className="btn btn-outline-primary btn-sm pt-2"
                        data-bs-toggle='tooltip'
                        tabIndex={-1}
                        title='ajouter au panier'
                        onClick={handleAddToCart}
                        options={{ loading: state.loading }}>
                        <i className="fa fa-cart-plus"></i>
                    </Button>
                </div>
            </div>

            {product.images.length > 0 ? <img
                src={appImage(product.images[0].name)} className="product-image" /> :
                <div className="product-image" />}
        </div>
        <div className="mt-3 product-card-information">
            <h6>{product.title}</h6>
            <DoublePrice {...price} />
        </div>
    </div>
});

export const HoverableProductPlaceholder = React.memo((props: { index: number }) => {
    const { index } = props;

    const productImageStyle = React.useMemo(() => ({ animationDelay: `${index * 500}ms` }), [index]);
    const productTitleStyle = React.useMemo(() => ({ animationDelay: `${index * 750}ms` }), [index]);

    return <div className="hoverable-product-placeholder placeholder-glow">
        <div className="product-image placeholder" style={productImageStyle}></div>
        <div className="product-title placeholder" style={productTitleStyle}></div>
    </div>
});

export default HoverableProduct;
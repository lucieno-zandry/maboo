import React from "react";
import { Link } from "react-router-dom";
import { Product, ProductList } from "../../constants/types";
import appImage from "../../helpers/appImage";
import DoublePrice from "../DoublePrice/DoublePrice";
import Button from "../Button/Button";
import { addToCart } from "../../api/customer/actions";
import useToasts from "../Toast/hooks/useToasts";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import links from "../../helpers/links";

type Props = {
    product: Product | ProductList,
    className?: string,
    showPrice?: boolean,
};

type Payload = {
    product_id: number,
    quantity: number,
    product_variant_id?: number
};

const HoverableProduct = React.memo((props: Props) => {
    const toasts = useToasts();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { product, className = '', showPrice = true } = React.useMemo(() => props, [props]);

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
        if (!showPrice) return null;
        const variant = product.variants[0];
        const firstPrice = (variant?.price) || 0;
        const secondPrice = variant?.special_price ?? undefined;
        return { firstPrice, secondPrice } as { firstPrice: number, secondPrice?: number };
    }, [product, showPrice]);

    const handleAddToCart = React.useCallback(() => {
        if (!auth) {
            const intended = { path: `/product/${product.slug}`, target: true };
            sessionStorage.setItem('intended', JSON.stringify(intended));
            navigate(links.loginPage);
            return;
        }
        setState(s => ({ ...s, loading: true }));
        addToCart(payload)
            .then(() => {
                toasts.push({ title: "Ajouté au panier", content: "Votre panier a été mis à jour avec succès", type: "success" });
            })
            .catch(() => {
                toasts.push({ title: "Impossible d'ajouter au panier", content: "Une erreur s'est produite lors de l'ajout au panier", type: "danger" });
            })
            .finally(() => setState(s => ({ ...s, loading: false })));
    }, [auth, navigate, product.slug, payload, toasts.push]);

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

            {('images' in product && product.images.length > 0) ? (
                <img alt="An image of a product" src={appImage(product.images[0].name)} className="product-image" />
            ) : (product.variants[0]?.image ? (
                <img alt="An image of a product" src={appImage(product.variants[0].image as any)} className="product-image" />
            ) : (
                <div className="product-image" />
            ))}
        </div>
        <div className="mt-3 product-card-information">
            <h6>{product.title}</h6>
            {showPrice && price && <DoublePrice {...price} />}
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

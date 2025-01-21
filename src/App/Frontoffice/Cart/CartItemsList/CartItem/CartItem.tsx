import React from "react";
import * as Types from "../../../../../utilities/constants/types";
import Price from "../../../../../utilities/minitiatures/Price/Price";
import { useCartSelection } from "../../Cart";
import Checkbox from "../../../../../utilities/minitiatures/Checkbox/Checkbox";
import appImage from "../../../../../utilities/helpers/appImage";
import CountButton from "../../../../../utilities/minitiatures/CountButton/CountButton";
import { Link } from "react-router-dom";
import usePagePreloader from "../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { updateCartItem } from "../../../../../utilities/api/customer/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../utilities/redux/store";
import useToasts from "../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import SmallText from "../../../../../utilities/minitiatures/SmallText/SmallText";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import DoublePrice from "../../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import { refreshCart } from "../../../../../utilities/redux/frontoffice/frontofficeSlice";

type Props = {
    cartItem: Types.CartItem,
    onDelete: Function,
}

const CartItem = React.memo((props: Props) => {
    let TIMEOUT = null as number | null;

    const { cartItem, onDelete } = props;
    const cartSelection = useCartSelection();
    const pagePreloader = usePagePreloader();
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();

    const [newQuantity, setNewQuantity] = React.useState(null as number | null);

    const handleSelectChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        let newCartItems = [...cartSelection.cartItems!];

        if (checked && cartSelection.cartItems) {
            newCartItems.push(cartItem);
        } else {
            newCartItems = newCartItems.filter(item => item.id !== cartItem.id);
        }

        cartSelection.setCartItems(newCartItems);
    }, [cartSelection.cartItems, cartItem]);

    const handleQuantityChange = React.useCallback((quantity: number) => {
        setNewQuantity(quantity);

        const action = () => {
            pagePreloader.enable();
            cartSelection.setCartItems([]);

            updateCartItem(cartItem.id, { quantity })
                .then(() => {
                    dispatch(refreshCart());
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible de mettre l'article à jour !",
                        content: "Une erreur s'est produite lors de la tentative de mise à jour de l'article.",
                        type: "danger"
                    })
                })
                .finally(() => {
                    pagePreloader.disable();
                })
        }

        TIMEOUT && clearTimeout(TIMEOUT);
        TIMEOUT = setTimeout(() => {
            action();
            TIMEOUT = null;
        }, 1000);

    }, [pagePreloader, cartItem.id, toasts.push, cartSelection.setCartItems]);

    const ItemSubtotal = React.useMemo(() => {
        const productPrice = cartItem.product_variant?.price || cartItem.product.sale_price || cartItem.product.price;
        const intendedSubtotal = productPrice * cartItem.quantity;

        if (intendedSubtotal !== cartItem.subtotal) {
            return <DoublePrice
                firstPrice={intendedSubtotal}
                secondPrice={cartItem.subtotal}
                className="product-price" />
        } else {
            return <Price amount={cartItem.subtotal}
                className="product-price" />
        }
    }, [cartItem]);

    const image = React.useMemo(() => {
        if (cartItem.product_variant) {
            return appImage(cartItem.product_variant.image);
        }

        return appImage(cartItem.product.images[0]?.name)
    }, []);

    return <div className="cart-item">
        <Checkbox
            label=''
            checked={cartSelection.cartItems.some(item => item.id === cartItem.id)}
            onChange={handleSelectChange} />

        <SquaredImage
            image={image} />

        <div className="col-3">
            <Link className="product-title" to={`/product/${cartItem.product.slug}`}>
                {cartItem.product.title}
            </Link>
            <p className="product-description p-0">
                <SmallText
                    isExtendable={false}
                    maxLength={50}>
                    {cartItem.product.description}
                </SmallText>
            </p>
            {cartItem.product_variant &&
                <div>Variant: <span className="bold">{cartItem.product_variant.name}</span></div>}
        </div>

        {ItemSubtotal}

        <CountButton
            count={newQuantity || cartItem.quantity}
            onChange={handleQuantityChange}
            max={cartItem.product.inStock}
            className="col-2" />

        <Button
            type="button"
            className="btn"
            onClick={() => onDelete(cartItem.id)}>
            <i className="fa fa-xmark"></i>
        </Button>
    </div>
})

export default CartItem;
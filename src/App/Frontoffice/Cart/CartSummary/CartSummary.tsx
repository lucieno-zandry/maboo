import React from "react";
import { useCartSelection } from "../Cart";
import arraySum from "../../../../utilities/helpers/arraySum";
import { CartItem } from "../../../../utilities/constants/types";
import Price from "../../../../utilities/minitiatures/Price/Price";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import valuesOf from "../../../../utilities/helpers/valuesOf";
import usePagePreloader from "../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { makeOrder } from "../../../../utilities/api/customer/actions";
import { useNavigate } from "react-router-dom";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";
import Button from "../../../../utilities/minitiatures/Button/Button";
import { refreshCart } from "../../../../utilities/redux/frontoffice/frontofficeSlice";

const CartSummary = React.memo(() => {
    const { cartItems } = useCartSelection();
    const cart = useSelector((state: Rootstate) => state.frontoffice.cart!);
    const pagePreloader = usePagePreloader();
    const navigate = useNavigate();
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const items = React.useMemo(() => cartItems.length > 0 ? cartItems : cart, [cartItems, cart]);

    const subTotal = React.useMemo(() => {
        return arraySum<CartItem>(items, (cartItem) => cartItem.subtotal);
    }, [items]);

    const handleMakeOrder = React.useCallback(() => {
        const itemIds = valuesOf<number>('id', items);
        if (itemIds.length > 0) {
            pagePreloader.enable();
            makeOrder(itemIds)
                .then(response => {
                    if (response.data?.order_id) {
                        dispatch(refreshCart());
                        navigate(`/orders/order/${response.data.order_id}`);
                    }
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible d'initier la commande",
                        content: "Une erreur s'est produite lors du traitement de votre demande, veuillez reéssayer",
                        type: "danger"
                    });
                })
                .finally(() => {
                    pagePreloader.disable();
                })
        }
    }, [items, pagePreloader, toasts.push]);

    return <div className="cart-summary">
        <Price amount={subTotal} className="cart-subtotal" />
        <Button
            type="button"
            className="btn btn-primary"
            onClick={handleMakeOrder}>
            Commander (<span >
                {cartItems.length || cart.length}</span>)
        </Button>
    </div>
});

export default CartSummary;
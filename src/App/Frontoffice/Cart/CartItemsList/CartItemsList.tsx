import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import Checkbox from "../../../../utilities/minitiatures/Checkbox/Checkbox";
import { useCartSelection } from "../Cart";
import { deleteCartItems } from "../../../../utilities/api/customer/actions";
import valuesOf from "../../../../utilities/helpers/valuesOf";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";
import usePagePreloader from "../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import CartItem from "./CartItem/CartItem";
import Button from "../../../../utilities/minitiatures/Button/Button";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import { refreshCart } from "../../../../utilities/redux/frontoffice/frontofficeSlice";

const CartItemsList = React.memo(() => {
    const cart = useSelector((state: Rootstate) => state.frontoffice.cart);
    const cartSelection = useCartSelection();
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();
    const pagePreloader = usePagePreloader();

    const handleSelectAll = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (checked) {
            cartSelection.setCartItems(cart!);
        } else {
            cartSelection.setCartItems([]);
        }
    }, [cartSelection.setCartItems, cart]);

    const handleDelete = React.useCallback((cartItemId?: number) => {
        if (cartItemId || cartSelection.cartItems) {
            const ids = cartItemId ? [cartItemId] : valuesOf<number>('id', cartSelection.cartItems!);
            pagePreloader.enable();

            deleteCartItems(ids)
                .then(() => {
                    dispatch(refreshCart());

                    toasts.push({
                        title: 'Panier mis à jour!',
                        content: "Les articles ont été supprimés du panier.",
                        type: "success",
                    });

                    cartSelection.setCartItems([]);
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible de supprimer les articles",
                        content: "Une erreur s'est produite lors de la suppression des produits du panier.",
                        type: "danger",
                    })
                })
                .finally(() => {
                    pagePreloader.disable();
                })
        }
    }, [cartSelection, toasts.push, pagePreloader]);

    return <div className="cart-items-list-container">
        <div className="cart-items-list-actions px-5">
            <h5 className="cart-items-title">Articles <span >({cart?.length})</span></h5>
            <div className="d-flex gap-2 align-items-center">
                <Checkbox
                    label="Tout"
                    checked={cartSelection.cartItems.length === cart?.length}
                    onChange={handleSelectAll}
                    className="py-2" />

                <Fade show={cartSelection.cartItems.length > 0}>
                    <Button
                        type="button"
                        className="btn text-danger"
                        onClick={() => handleDelete()}>Supprimer <span >({cartSelection.cartItems.length})</span></Button>
                </Fade>
            </div>
        </div>

        <div className="cart-items px-5">
            {cart?.map(item => {
                return <CartItem cartItem={item} onDelete={handleDelete} key={item.id} />
            })}
        </div>
    </div>
});

export default CartItemsList;
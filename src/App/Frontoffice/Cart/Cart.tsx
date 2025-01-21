import React from "react";
import CartItemsList from "./CartItemsList/CartItemsList";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../utilities/redux/store";
import { CartItem } from "../../../utilities/constants/types";
import CartEmpty from "./CartEmpty/CartEmpty";
import CartSummary from "./CartSummary/CartSummary";
import Loading from "../../../utilities/minitiatures/Loading/Loading";
import Fade from "../../../utilities/minitiatures/Fade/Fade";

const CartContext = React.createContext({
    selection: {
        cartItems: [] as CartItem[],
        setCartItems: function (cartItems: CartItem[]) { cartItems }
    }
});

export const useCartSelection = () => {
    return React.useContext(CartContext).selection;
}

const Cart = React.memo(() => {
    const { cart } = useSelector((state: Rootstate) => state.frontoffice);

    const [state, setState] = React.useState({
        selection: {
            cartItems: [] as CartItem[],
        }
    });

    const selection = React.useMemo(() => ({
        cartItems: state.selection.cartItems,
        setCartItems: (cartItems: CartItem[]) => {
            setState(s => ({ ...s, selection: { ...s.selection, cartItems } }))
        }
    }), [state.selection.cartItems]);

    return <CartContext.Provider value={{ selection }}>
        <Fade className="cart-container" show>
            {cart && cart.length === 0 && <CartEmpty />}
            {cart && cart.length > 0 && <>
                <CartItemsList />
                <CartSummary />
            </>}
            <Loading show={!cart}/>
        </Fade>
    </CartContext.Provider>
});

export default Cart;
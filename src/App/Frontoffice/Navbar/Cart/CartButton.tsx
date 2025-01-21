import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import { refreshCart } from "../../../../utilities/redux/frontoffice/frontofficeSlice";
import { Link } from "react-router-dom";
import useAuth from "../../../../utilities/hooks/useAuth";

const CartButton = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>()

    const { cart } = useSelector((state: Rootstate) => state.frontoffice);
    const { auth } = useAuth();
    
    const cartCount = React.useMemo(() => cart?.length || 0, [cart]);

    React.useEffect(() => {
        if (auth) {
            dispatch(refreshCart());
        }
    }, [auth]);

    return <Link
        to={'/cart'}
        className="btn cart-button">
        <span>
            <i className="fa fa-cart-shopping"></i>
            {cartCount > 0 &&
                <small>{cartCount}</small>}
        </span> Panier
    </Link>
})

export default CartButton;
import React from "react";
import leaf from './leaf.png';

const CartEmpty = React.memo(() => {
    return <div className="cart-empty-container">
        <img src={leaf} />
        <h5 className="display-6">Votre panier est vide.</h5>
    </div>
});

export default CartEmpty;
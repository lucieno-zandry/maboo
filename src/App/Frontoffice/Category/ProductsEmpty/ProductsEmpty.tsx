import React from "react";
import emptyBox from './empty-box.png';

const ProductsEmpty = React.memo(() => {
    return <div className="products-empty-container">
        <img src={emptyBox} />
        <h6 className="display-6">Aucun produit trouvé !</h6>
    </div>
})

export default ProductsEmpty;
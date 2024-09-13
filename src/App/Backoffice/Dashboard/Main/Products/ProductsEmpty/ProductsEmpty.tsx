import React from "react";
import emptyBox from './empty-box.png';

const ProductsEmpty = React.memo(() => {
    return <div className="page-empty-container">
        <img src={emptyBox} />
        <div className="display-6">
            Aucun produit trouvé
        </div>
    </div>
});

export default ProductsEmpty;
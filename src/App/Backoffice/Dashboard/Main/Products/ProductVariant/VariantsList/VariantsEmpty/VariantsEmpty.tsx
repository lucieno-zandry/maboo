import React from "react";
import variantsempty from "./variantsempty.png";

const VariantsEmpty = React.memo(() => {
    return <div className="variants-empty">
        <img
            src={variantsempty}
            className="variants-empty-image"/>

        <div className="variants-empty-title">
            Ce produit n'a pas de variant
        </div>
    </div>
});

export default VariantsEmpty;
import React from "react";
import colorsempty from "./colorsempty.png";

const ColorsEmpty = React.memo(() => {
    return <div className="colors-empty">
        <img
            src={colorsempty}
            className="colors-empty-image"/>

        <div className="colors-empty-title">
            Ce produit n'a aucune couleur.
        </div>
    </div>
});

export default ColorsEmpty;
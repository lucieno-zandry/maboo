import React from "react";
import { useColor } from "../../Products";
import ColorItem from "./ColorItem/ColorItem";
import ColorsEmpty from "./ColorsEmpty/ColorsEmpty";

const ColorsList = React.memo(() => {
    const { current } = useColor();
    const colors = React.useMemo(() => current?.colors, [current]);

    return <div className="colors-list product-color-section">
        <h4 className="product-color-section-title">Couleurs du produit</h4>
        
        {(colors && colors.length > 0) &&
            <table className="table table-striped table-hover align-middle table-borderless">
                <thead>
                    <tr>
                        <th className="col-3"></th>
                        <th className="col-3">Nom</th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {colors.map(color => {
                        return <ColorItem
                            color={color}
                            key={color.id} />
                    })}
                </tbody>
            </table>}

        {(colors && colors.length === 0) &&
            <ColorsEmpty />}
    </div>
});

export default ColorsList;
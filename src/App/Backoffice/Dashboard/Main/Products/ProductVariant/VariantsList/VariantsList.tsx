import React from "react";
import { useVariant } from "../../Products";
import VariantItem from "./VariantItem/VariantItem";
import VariantsEmpty from "./VariantsEmpty/VariantsEmpty";

const VariantsList = React.memo(() => {
    const { current } = useVariant();
    const variants = React.useMemo(() => current?.variants, [current]);

    return <div className="variants-list product-variant-section">
        <h4 className="product-variant-section-title">Variants du produit</h4>
        
        {(variants && variants.length > 0) &&
            <table className="table table-striped table-hover align-middle table-borderless">
                <thead>
                    <tr>
                        <th className="col-3"></th>
                        <th className="col-3">Nom</th>
                        <th className="col-3">Prix</th>
                        <th className="col-3">En stock</th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {variants.map(variant => {
                        return <VariantItem
                            variant={variant}
                            key={variant.id} />
                    })}
                </tbody>
            </table>}

        {(variants && variants.length === 0) &&
            <VariantsEmpty />}
    </div>
});

export default VariantsList;
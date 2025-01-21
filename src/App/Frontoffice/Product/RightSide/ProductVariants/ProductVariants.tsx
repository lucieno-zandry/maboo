import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rootstate } from "../../../../../utilities/redux/store";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import appImage from "../../../../../utilities/helpers/appImage";
import ImagePreview from "../../../../../utilities/minitiatures/ImagePreview/ImagePreview";
import { ProductVariant } from "../../../../../utilities/constants/types";

type Props = {
    onChange: Function,
    active: ProductVariant | null,
}

const ProductVariants = React.memo((props: Props) => {
    const { active, onChange } = props;

    const slug = useParams().slug!;
    const product = useSelector((state: Rootstate) => state.frontoffice.products[slug]!);

    const [state, setState] = React.useState({
        preview: '',
    });

    const setPreview = React.useCallback((preview: string) => {
        setState(s => ({ ...s, preview }));
    }, []);

    const handleChange = React.useCallback((variant: ProductVariant) => {
        variant.inStock > 0 && onChange(variant);
    }, [onChange]);

    const handleClick = React.useCallback((variant_id: number, imageUrl?: string) => {
        (active?.id === variant_id && imageUrl) && setPreview(imageUrl);
    }, [active]);

    if (product.variants?.length > 0) {
        return <>
            <h6>Variant: <span className="variant-name">{active?.name}</span></h6>
            <ul className="product-variants-list">
                {product.variants.map(variant => {
                    const imageUrl = appImage(variant.image);
                    const checked = active?.id === variant.id;

                    return <li className="product-variant-item" key={variant.id}>
                        <input
                            type="radio"
                            hidden
                            id={`variant-input-${variant.id}`}
                            name="product-variant"
                            checked={checked}
                            onChange={() => handleChange(variant)}
                            disabled={variant.inStock === 0} />

                        <label
                            htmlFor={`variant-input-${variant.id}`}
                            onClick={() => handleClick(variant.id, imageUrl)}>

                            <SquaredImage
                                image={imageUrl}
                                layout />
                        </label>
                    </li>
                })}
            </ul>
            <ImagePreview
                imageUrl={state.preview}
                onHide={() => setPreview('')} />
        </>
    }

});

export default ProductVariants;
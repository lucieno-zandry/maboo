import React from "react";
import { PartialsProps } from "../VariantItem";
import { useDeleteProductVariant } from "../../../ProductVariant";
import SquaredImage from "../../../../../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import Price from "../../../../../../../../../utilities/minitiatures/Price/Price";
import { Dropdown } from "react-bootstrap";
import appImage from "../../../../../../../../../utilities/helpers/appImage";
import toFormatedString from "../../../../../../../../../utilities/helpers/toFormatedString";

const Default = React.memo((props: PartialsProps) => {
    const { variant, toggleEditMode } = props;
    const deleteProductVariants = useDeleteProductVariant();
    console.log(variant);
    
    return <>
        <td>
            <SquaredImage
                image={appImage(variant.image)}
                className="variant-image" />
        </td>
        <td className="variant-item-name">
            {variant.name}
        </td>
        <td className="variant-item-price">
            <Price amount={variant.price} />
        </td>
        <td className="variant-item-special-price">
            <Price amount={variant.special_price ?? 0} />
        </td>
        <td className="variant-item-sku">
            {variant.sku}
        </td>
        <td>
            {toFormatedString(variant.stock ?? variant.inStock)}
        </td>
        <td className="variant-item-attributes">
            {variant.attributes && Object.keys(variant.attributes).length > 0 && (
                Object.entries(variant.attributes!).map(([k, v]) => `${k}:${v}`).join(', ')
            )}
        </td>
        <td>
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={toggleEditMode}>
                        <i className="fa fa-pencil"></i> Modifier
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="text-danger"
                        onClick={() => deleteProductVariants.setCurrents([variant])}>
                        supprimer
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </>
})

export default Default;

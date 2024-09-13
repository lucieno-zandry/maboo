import React from "react";
import { Product } from "../../../../../../../utilities/constants/types";
import RoundedImage from "../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import SmallText from "../../../../../../../utilities/minitiatures/SmallText/SmallText";
import appImage from "../../../../../../../utilities/helpers/appImage";
import { Dropdown } from "react-bootstrap";
import { useColor, useDeleteProduct, useEditProduct, useVariant } from "../../Products";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import Price from "../../../../../../../utilities/minitiatures/Price/Price";

type Props = {
    product: Product,
    addToSelected: Function,
    removeFromSelected: Function,
    toggleSelected: Function,
    selected: Product[] | null,
}

const ProductRow = (props: Props) => {
    const { product, addToSelected, removeFromSelected, selected, toggleSelected } = props;
    const { setCurrent } = useEditProduct();
    const onDelete = useDeleteProduct();
    const variant = useVariant();
    const color = useColor();

    const handleSelect = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        
        if (checked) {
            addToSelected(product);
        } else {
            removeFromSelected(product.id);
        }
    }, [product, addToSelected, removeFromSelected]);

    const handleDeleteUnique = React.useCallback(() => {
        onDelete.setCurrent([product]);
        selected && toggleSelected();
    }, [product, onDelete, selected]);

    return <tr>
        {selected && <td>
            <Checkbox
                label=''
                checked={selected.some((checked) => checked.id === product.id)}
                onChange={handleSelect} />
        </td>}
        <td>
            <RoundedImage image={appImage(product.images[0]?.name) || undefined} />
        </td>
        <td>
            {product.title}
        </td>
        <td>
            <SmallText
                isExtendable={true}
                maxLength={50}>
                {product.description}
            </SmallText>
        </td>
        <td>
            <Price amount={product.price} />
        </td>
        <td>
            {new Date(product.created_at).toLocaleDateString()}
        </td>
        <td>
            <div className="d-flex gap-1 align-items-center">
                {product.category ? <>
                    <RoundedImage image={appImage(product.category.image) || undefined} />
                    {product.category.name}
                </> : <div className="text-danger">
                    <i className="fa fa-xmark-circle"></i> Supprimé
                </div>}
            </div>
        </td>
        <td className="text-align-center">
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => setCurrent(product)}>
                        <i className="fa fa-pencil"></i> Modifier
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => variant.setCurrent(product)}>
                        <i className="fa-light fa-table"></i> variants
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => color.setCurrent(product)}>
                        <i className="fa-solid fa-droplet"></i> Couleurs
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="text-danger"
                        onClick={handleDeleteUnique}>
                        <i className="fa fa-trash"></i> Supprimer
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
}

export default ProductRow;
import React from "react";
import { Category, ProductList } from "../../../../../../../utilities/constants/types";
import RoundedImage from "../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import SmallText from "../../../../../../../utilities/minitiatures/SmallText/SmallText";
import appImage from "../../../../../../../utilities/helpers/appImage";
import { Dropdown } from "react-bootstrap";
import { useDeleteProduct, useEditProduct } from "../../Products";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import Price from "../../../../../../../utilities/minitiatures/Price/Price";

type Props = {
    product: ProductList,
    categories: Category[],
    addToSelected: Function,
    removeFromSelected: Function,
    toggleSelected: Function,
    selected: ProductList[] | null,
}

const ProductRow = (props: Props) => {
    const { product, categories, addToSelected, removeFromSelected, selected, toggleSelected } = props;
    const edit = useEditProduct();
    const onDelete = useDeleteProduct();

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

    const image = React.useMemo(() => {
        if (product.variants && product.variants.length > 0 && product.variants[0].image) {
            return appImage(product.variants[0].image);
        }
        return undefined;
    }, [product]);

    const price = React.useMemo(() => {
        const first = product.variants?.[0];
        if (!first) return 0;
        return (first.special_price ?? first.price) || 0;
    }, [product]);

    const category = React.useMemo(() => {
        return categories.find(c => c.id === product.category_id) || null;
    }, [categories, product.category_id]);

    return <tr>
        {selected && <td>
            <Checkbox
                label=''
                checked={selected.some((checked) => checked.id === product.id)}
                onChange={handleSelect} />
        </td>}
        <td>
            <RoundedImage image={image} />
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
            <Price amount={price} />
        </td>
        <td>
            {new Date(product.created_at).toLocaleDateString()}
        </td>
        <td>
            <div className="d-flex gap-1 align-items-center">
                {category ? <>
                    <RoundedImage image={appImage(category.image) || undefined} />
                    {category.name}
                </> : <div className="text-muted">
                    <i className="fa fa-xmark-circle"></i> Non défini
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
                        onClick={() => edit.open(product)}>
                        <i className="fa fa-pencil"></i> Modifier
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

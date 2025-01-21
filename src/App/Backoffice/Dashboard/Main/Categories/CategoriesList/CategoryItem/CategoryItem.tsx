import React from "react";
import { Category } from "../../../../../../../utilities/constants/types";
import appImage from "../../../../../../../utilities/helpers/appImage";
import { Dropdown } from "react-bootstrap";
import RoundedImage from "../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import { useCategoryEdit, useDeleteCategory } from "../../Categories";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";

type Props = {
    category: Category,
    parentCategory: Category | null,
    selection: Category[] | null,
    setSelection: (selection: Category[] | null) => void,
}

const CategoryItem = React.memo((props: Props) => {
    const { category, parentCategory, selection, setSelection } = props;
    const { setEditing } = useCategoryEdit();

    const deleteCategory = useDeleteCategory();

    const addToSelection = React.useCallback((category: Category) => {
        if (selection && !selection.some(selected => selected.id === category.id)) {
            const newSelection = [...selection];
            newSelection.push(category);

            setSelection(newSelection);
        }
    }, [selection, setSelection]);

    const removeFromSelection = React.useCallback((category: Category) => {
        if (selection && selection.some(selected => selected.id === category.id)) {
            setSelection([...selection].filter(selected => selected.id !== category.id));
        }
    }, [selection, setSelection]);

    const handleSelection = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, category: Category) => {
        e.target.checked ? addToSelection(category) : removeFromSelection(category);
    }, [addToSelection, removeFromSelection]);

    const handleDeleteUnique = React.useCallback((category: Category) => {
        deleteCategory.setDeleting([category]);
        if (selection) {
            setSelection(null);
        }
    }, [selection]);


    return <tr className="category-item-container">
        {selection && <td>
            <Checkbox
                label=''
                checked={selection.some(selected => selected.id === category.id)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelection(e, category)} />
        </td>}

        <td><RoundedImage image={appImage(category.image)} /></td>
        <td className="">{category.name}</td>
        <td className="">{parentCategory?.name || 'Non défini'}</td>
        <td >{new Date(category.created_at).toLocaleDateString()}</td>
        <td className="text-align-center">
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setEditing(category)}>
                        <i className="fa fa-pencil"></i> Modifier
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => handleDeleteUnique(category)}>
                        <i className="fa fa-trash"></i> Supprimer
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
});

export default CategoryItem;
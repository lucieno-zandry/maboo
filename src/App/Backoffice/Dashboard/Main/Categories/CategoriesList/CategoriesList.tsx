import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../../../utilities/redux/store";
import CategoryItem from "./CategoryItem/CategoryItem";
import getParentCategory from "../../../../../../utilities/helpers/getParentCategory";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { Category } from "../../../../../../utilities/constants/types";
import Checkbox from "../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { useDeleteCategory } from "../Categories";
import { useFilterRow } from "../../../../../../utilities/hooks/admin/useFilterRow";

const CategoriesList = React.memo(() => {
    const categories = useSelector((state: Rootstate) => state.backoffice.categories);
    const deleteCategory = useDeleteCategory();
    const filterRow = useFilterRow();

    const [state, setState] = React.useState({
        selection: null as Category[] | null,
    });

    const setSelection = React.useCallback((selection: Category[] | null) => {
        setState(s => ({ ...s, selection }));
    }, []);

    const toggleSelect = React.useCallback(() => {
        setSelection(state.selection ? null : [])
    }, [state.selection, setSelection]);

    const handleSelectAll = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setSelection(checked ? categories : []);
    }, [categories, setSelection]);

    const handleDeleteCategories = React.useCallback(() => {
        if (state.selection) {
            deleteCategory.setDeleting(state.selection);
            setSelection(null);
        }
    }, [state.selection, deleteCategory.setDeleting, setSelection]);


    return <table className="categories-list-container table table-striped table-hover align-middle">
        <thead>
            <tr>
                {state.selection && <th className="col-1">
                    <Checkbox
                        label='tout'
                        checked={state.selection.length === categories?.length}
                        onChange={handleSelectAll}
                    />
                </th>}
                <th></th>
                <th>Nom</th>
                <th>Catégorie Parente</th>
                <th>Créé le</th>
                <th className="col-2 text-align-center">
                    {state.selection ?
                        <Button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={handleDeleteCategories}
                            disabled={state.selection?.length === 0}>
                            <i className="fa fa-trash btn-sm"></i> Supprimer
                        </Button> :
                        <Button type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={toggleSelect}>
                            Séléctionner
                        </Button>}
                </th>
            </tr>
        </thead>
        <tbody>
            {categories?.map((category) => {
                const parentCategory = getParentCategory(category, categories);
                const row = <CategoryItem
                    category={category}
                    key={category.id}
                    parentCategory={parentCategory}
                    selection={state.selection}
                    setSelection={setSelection} />

                return filterRow([
                    category.name,
                ], row);
            })}
        </tbody>
    </table>
});

export default CategoriesList;
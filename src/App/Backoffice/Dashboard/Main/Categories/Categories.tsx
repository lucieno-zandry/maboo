import React from "react";
import CategoriesList from "./CategoriesList/CategoriesList";
import AddCategory from "./AddCategory/AddCategory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { refreshCategories } from "../../../../../utilities/redux/backoffice/backofficeSlice";
import { Category } from "../../../../../utilities/constants/types";
import EditCategory from "./EditCategory/EditCategory";
import DeleteCategory from "./DeleteCategory/DeleteCategory";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import CategoriesEmpty from "./CategoriesEmpty/CategoriesEmpty";
import TablePlaceholder from "../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";

const DEFAULTCATEGORYEDIT = {
    editing: null as Category | null,
    setEditing: function (category: Category | null) { category }
}

const DEFAULTCATEGORYDELETE = {
    deleting: null as Category[] | null,
    setDeleting: function (categories: Category[] | null) { categories }
}

type CategoryEditContext = typeof DEFAULTCATEGORYEDIT;

type CategoryDeleteContext = typeof DEFAULTCATEGORYDELETE;

const CategoriesContext = React.createContext({
    categoryEdit: {
        ...DEFAULTCATEGORYEDIT,
        setEditing: function () { },
    } as CategoryEditContext,
    categoryDelete: {
        ...DEFAULTCATEGORYDELETE,
    } as CategoryDeleteContext
});

export const useCategoryEdit = () => {
    return React.useContext(CategoriesContext).categoryEdit;
}

export const useDeleteCategory = () => {
    return React.useContext(CategoriesContext).categoryDelete;
}

const Categories = React.memo(() => {
    const categories = useSelector((state: Rootstate) => state.backoffice.categories);
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        categoryEdit: DEFAULTCATEGORYEDIT,
        categoryDelete: DEFAULTCATEGORYDELETE,
    });

    React.useEffect(() => {
        if (!categories) {
            dispatch(refreshCategories());
        }
    }, [categories]);

    const setEditing = React.useCallback((category: Category | null) => {
        setState(s => ({ ...s, categoryEdit: { ...s.categoryEdit, editing: category } }));
    }, []);

    const setDeleting = React.useCallback((categories: Category[] | null) => {
        setState(s => ({ ...s, categoryDelete: { ...s.categoryDelete, deleting: categories } }));
    }, []);

    const categoryEditValue = React.useMemo(() => ({ ...state.categoryEdit, setEditing }), [state.categoryEdit, setEditing]);
    const categoryDeleteValue = React.useMemo(() => ({ ...state.categoryDelete, setDeleting }), [state.categoryDelete, setDeleting]);

    return <CategoriesContext.Provider value={{
        categoryEdit: categoryEditValue,
        categoryDelete: categoryDeleteValue
    }}>
        <div className="categories-container">
            <AddCategory />

            <Fade show={Boolean(categories && categories.length > 0)}>
                <CategoriesList />
            </Fade>

            <Fade show={!categories}>
                <TablePlaceholder />
            </Fade>

            <Fade show={categories?.length === 0}>
                <CategoriesEmpty />
            </Fade>

            <EditCategory />

            <DeleteCategory />
        </div>
    </CategoriesContext.Provider>
});

export default Categories;
import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import ImageInputDD, { Image } from "../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import getValidationMessages from "../../../../../../utilities/helpers/getValidationMessages";
import { createCategory } from "../../../../../../utilities/api/admin/actions";
import { AxiosError } from "axios";
import useToasts from "../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { refreshCategories } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import { AppDispatch } from "../../../../../../utilities/redux/store";
import { Category } from "../../../../../../utilities/constants/types";
import Input from "../../../../../../utilities/minitiatures/Input/Input";
import SelectedCategory from "./SelectedCategory/SelectedCategory";
import useCategorySelect from "../../../../../../utilities/minitiatures/CategorySelect/hooks/useCategorySelect";

type AddCategoryData = {
    name?: string,
    image?: any,
    parent_id: number | null | undefined,
}

const DEFAULTIMAGE = {
    imageData: null as File | null,
    imageUrl: '',
} as Image

const DEFAULTCATEGORYDATA = {
    categoryName: '',
    categoryImage: DEFAULTIMAGE,
    parentCategory: null as Category | null,
}

const AddCategory = React.memo(() => {
    const toasts = useToasts();
    const categorySelect = useCategorySelect();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        show: false,
        validationMessages: null as AddCategoryData | null,
        categoryData: DEFAULTCATEGORYDATA,
        loading: false,
    });

    const setShow = React.useCallback((show: boolean) => setState(s => ({ ...s, show })), []);

    const addImage = React.useCallback((image: Image) => {
        setState(s => ({ ...s, categoryData: { ...s.categoryData, categoryImage: image } }));
    }, []);

    const removeImage = React.useCallback(() => {
        setState(s => ({ ...s, categoryData: { ...s.categoryData, categoryImage: DEFAULTIMAGE } }));
    }, []);

    const handleParentCategoryChange = React.useCallback((category: Category | null) => {
        setState(s => ({ ...s, categoryData: { ...s.categoryData, parentCategory: category }, show: true }));
    }, []);

    const handleOpenCategorySelect = React.useCallback(() => {
        setState(s => ({ ...s, show: false }));
        categorySelect.open(handleParentCategoryChange, state.categoryData.parentCategory?.id || null);
    }, [state.categoryData.parentCategory]);

    const handleSubmit = React.useCallback(() => {
        const validationMessages = getValidationMessages<AddCategoryData>({
            categoryName: state.categoryData.categoryName,
        });

        setState(s => ({ ...s, validationMessages, loading: !Boolean(validationMessages) }));

        if (!validationMessages) {
            const newState = { ...state };
            const formData = {} as AddCategoryData

            const { imageData } = state.categoryData.categoryImage;

            if (state.categoryData.categoryName) {
                formData.name = state.categoryData.categoryName;
            }

            if (imageData) {
                formData.image = imageData;
            }

            if (state.categoryData.parentCategory) {
                formData.parent_id = state.categoryData.parentCategory.id
            }

            createCategory(formData)
                .then(() => {
                    newState.show = false;
                    newState.categoryData = DEFAULTCATEGORYDATA;

                    toasts.push({
                        title: "Catégorie Créée",
                        content: "La catégorie a été créée avec succès",
                        type: "success"
                    });

                    dispatch(refreshCategories());
                })
                .catch((error: AxiosError) => {
                    const { errors } = error.response?.data as { errors?: AddCategoryData };

                    if (errors) {
                        newState.validationMessages = errors;
                    }
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                });
        }
    }, [state]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(s => ({ ...s, categoryData: { ...s.categoryData, [name]: value } }));
    }, []);

    return <div className="add-category-container">
        <Button
            className="btn btn-secondary add-button"
            type="button"
            onClick={() => setShow(true)}>
            <i className="fa fa-plus"></i> Créer
        </Button>

        <Modal as="form"
            show={state.show}
            onHide={() => setShow(false)}
            size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Création d'une catégorie</Modal.Title>
            </Modal.Header>

            <Modal.Body className="category-modal-body">
                <label htmlFor="categoryName">
                    Nom de la catégorie:
                    <Input
                        className="w-50"
                        type="text"
                        name="categoryName"
                        placeholder="nom de la catégorie"
                        id="categoryName"
                        options={{ error: state.validationMessages?.name }}
                        onChange={handleChange}
                        value={state.categoryData.categoryName} />
                </label>

                <div className="category-image-container">
                    <h6 className="add-category-h6">Image de la catégorie</h6>
                    <ImageInputDD
                        addImage={addImage}
                        removeImage={removeImage}
                        imageUrl={state.categoryData.categoryImage.imageUrl}
                        id="category-image-input"
                        className="category-image-input" />
                </div>

                <div>
                    <h6 className="add-category-h6">Parent de la catégorie</h6>
                    <SelectedCategory category={state.categoryData.parentCategory} />
                    <Button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleOpenCategorySelect}>Ouvrir <i className="fa fa-external-link-alt"></i></Button>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button type="button" className="btn btn-outline-dark btn-sm"
                    onClick={() => setShow(false)}>
                    Annuler
                </Button>
                <Button
                    type="submit"
                    options={{ loading: state.loading }}
                    className="btn btn-primary btn-sm"
                    onClick={handleSubmit}>
                    <i className="fa fa-check"></i> Sauvegarder
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
});

export default AddCategory;
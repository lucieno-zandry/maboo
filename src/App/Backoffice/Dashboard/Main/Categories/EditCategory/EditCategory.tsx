import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { useCategoryEdit } from "../Categories";
import Input from "../../../../../../utilities/minitiatures/Input/Input";
import ImageInputDD, { Image } from "../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import SelectedCategory from "../AddCategory/SelectedCategory/SelectedCategory";
import { Category } from "../../../../../../utilities/constants/types";
import appImage from "../../../../../../utilities/helpers/appImage";
import getValidationMessages from "../../../../../../utilities/helpers/getValidationMessages";
import { updateCategory } from "../../../../../../utilities/api/admin/actions";
import { AxiosError } from "axios";
import useToasts from "../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../utilities/redux/store";
import { refreshCategories } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import getParentCategory from "../../../../../../utilities/helpers/getParentCategory";
import useCategorySelect from "../../../../../../utilities/minitiatures/CategorySelect/hooks/useCategorySelect";

type UpdateData = {
    category_name?: string,
    parent?: Category | null,
    image?: {
        imageUrl?: string,
        imageData: File | null
    }
}

type Payload = {
    name?: string,
    image?: File | null,
    parent_id?: number | null,
    id: number
}

type ValidationMessages = {
    name?: string,
}

const EditCategory = React.memo(() => {
    const { editing, setEditing } = useCategoryEdit();
    const { open } = useCategorySelect();
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: Rootstate) => state.backoffice);

    const [state, setState] = React.useState({
        show: false,
        validationMessages: null as ValidationMessages | null,
        updateData: {} as UpdateData,
        loading: false,
    });

    React.useEffect(() => {
        if (editing) {
            setState(s => ({ ...s, show: Boolean(editing) }));
        }
    }, [editing]);

    const onFinishSelection = React.useCallback((category: Category | null) => {
        setState(s => ({ ...s, updateData: { ...s.updateData, parent: category }, show: true }));
    }, []);

    const handleOpenCategorySelect = React.useCallback(() => {
        setState(s => ({ ...s, show: false }));
        open(onFinishSelection, editing?.parent_id || state.updateData.parent?.id || null, [editing?.id!])
    }, [editing, state.updateData]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(s => ({ ...s, updateData: { ...s.updateData, [name]: value } }))
    }, []);

    const addImage = React.useCallback((image: Image) => {
        setState(s => ({ ...s, updateData: { ...s.updateData, image } }));
    }, []);

    const removeImage = React.useCallback(() => {
        setState(s => {
            return { ...s, updateData: { ...s.updateData, image: { imageUrl: '', imageData: null } } };
        })
    }, []);

    const handleSubmit = React.useCallback(() => {
        const validationMessagesData = {} as ValidationMessages

        if (state.updateData?.category_name) {
            validationMessagesData.name = state.updateData.category_name;
        }

        const validationMessages = getValidationMessages<ValidationMessages>(validationMessagesData);
        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));

        if (!validationMessages) {
            const newState = { ...state };

            const { category_name, image, parent } = state.updateData;
            const payload: Payload = { id: editing!.id };

            if (category_name) {
                payload.name = category_name!;
            }

            if (image?.imageData !== undefined) {
                payload.image = image.imageData;
            }

            if (parent !== undefined) {
                payload.parent_id = parent?.id || null
            }

            updateCategory(payload)
                .then(() => {
                    toasts.push({
                        title: "Catégorie mise à jour",
                        content: "Vos modifications sur la catégorie ont été sauvegargées",
                        type: "success",
                    });

                    dispatch(refreshCategories());
                    setEditing(null);
                    newState.show = false;
                })
                .catch((error: AxiosError) => {
                    const { errors } = error.response?.data as { errors?: null };
                    if (errors) {
                        newState.validationMessages = errors;
                    }
                })
                .finally(() => {
                    newState.loading = false;
                    setState(s => ({ ...s, ...newState }));
                })
        }
    }, [state, editing]);

    const handleHide = React.useCallback(() => {
        setEditing(null);
        setState(s => ({ ...s, show: false }));
    }, []);

    const imageUrl = React.useMemo(() => {
        if (state.updateData.image === undefined) {
            return appImage(editing?.image || null);
        }

        return state.updateData.image.imageUrl;
    }, [editing, state.updateData]);

    const categoryName = React.useMemo(() => {
        const { category_name } = state.updateData;
        if (category_name !== undefined) {
            return category_name
        }
        return editing?.name
    }, [state.updateData, editing?.name])

    const selectedCategory = React.useMemo(() => {
        if (state.updateData.parent !== undefined) {
            return state.updateData.parent;
        }

        return (categories && editing) ? getParentCategory(editing, categories) : null
    }, [state.updateData.parent, categories]);

    if (categories) {
        return <Modal show={state.show} onHide={handleHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Modifier une catégorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="category-modal-body">
                <label htmlFor="category_name">
                    Nom de la catégorie:
                    <Input
                        className="w-50"
                        type="text"
                        name="category_name"
                        placeholder="nom de la catégorie"
                        id="category_name"
                        options={{ error: state.validationMessages?.name }}
                        onChange={handleChange}
                        value={categoryName || ''} />
                </label>

                <div className="category-image-container">
                    <h6 className="add-category-h6">Image de la catégorie</h6>
                    <ImageInputDD
                        addImage={addImage}
                        removeImage={removeImage}
                        imageUrl={imageUrl}
                        id="category-image-input"
                        className="category-image-input" />
                </div>

                <div>
                    <h6 className="add-category-h6">Parent de la catégorie</h6>
                    <SelectedCategory category={selectedCategory} />
                    <Button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleOpenCategorySelect}>Ouvrir <i className="fa fa-external-link-alt"></i></Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    options={{ loading: state.loading }}>
                    <i className="fa fa-check"></i> Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    }
})

export default EditCategory;
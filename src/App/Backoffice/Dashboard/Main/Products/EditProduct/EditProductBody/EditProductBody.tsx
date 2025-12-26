import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import SelectedCategory from "../../../Categories/AddCategory/SelectedCategory/SelectedCategory";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import { useEditProduct, useProducts } from "../../Products";
import { Category } from "../../../../../../../utilities/constants/types";
import useCategorySelect from "../../../../../../../utilities/minitiatures/CategorySelect/hooks/useCategorySelect";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { AxiosError } from "axios";
import { updateProduct } from "../../../../../../../utilities/api/actions";
import VariantsList from "../../ProductVariant/VariantsList/VariantsList";
import AddVariant from "../../ProductVariant/AddVariant/AddVariant";
import { ProductVariantProvider } from "../../ProductVariant/ProductVariant";
import DeleteVariantsDialogue from "../../ProductVariant/DeleteVariantsDialogue/DeleteVariantsDialogue";

const DEFAULTINPUTVALUES = {
    title: '',
    description: '',
    category: null as Category | null,
}

export type EditProductData = {
    id: number,
    title?: string,
    description?: string,
    category_id?: number,
    images?: File[],
}

const EditProductBody = React.memo(() => {
    const edit = useEditProduct();
    const { reloadProducts } = useProducts();
    const { categories } = useProducts();
    const categorySelect = useCategorySelect();
    const toasts = useToasts();

    const [state, setState] = React.useState({
        inputValues: DEFAULTINPUTVALUES,
        loading: false,
        validationMessages: null as null | { [key: string]: any },
        lastProductId: null as number | null,
    });

    const HandleCategorySelectClose = React.useCallback((selected: Category | null) => {
        setState(s => ({ ...s, inputValues: { ...s.inputValues, category: selected } }))
    }, []);

    const handleOpenCategorySelect = React.useCallback(() => {
        categorySelect.open(HandleCategorySelectClose, state.inputValues.category?.id);
    }, [categorySelect.open, HandleCategorySelectClose]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState(s => ({ ...s, inputValues: { ...s.inputValues, [name]: value } }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        if (edit.current) {
            setState(s => ({ ...s, loading: true }));
            const newState = { ...state };
            const { title, description, category } = state.inputValues;
            const payload = { id: edit.current.id } as EditProductData;

            if (title && title !== edit.current.title) {
                payload.title = state.inputValues.title;
            }

            if (category && category.id !== edit.current.category_id) {
                payload.category_id = category.id;
            }

            if (description && description !== edit.current.description) {
                payload.description = description;
            }

            updateProduct(payload)
                .then(() => {
                    newState.inputValues = DEFAULTINPUTVALUES;
                    edit.setCurrent(null);

                    toasts.push({
                        title: "Produit mis à jour!",
                        content: "Vos modifications sur le produit ont été sauvegardées.",
                        type: "success",
                    });

                    reloadProducts();
                })
                .catch((error: AxiosError) => {
                    const data = error.response?.data as any;
                    if (error.response?.status === 422 && data?.errors) {
                        newState.validationMessages = data.errors;
                    } else {
                        toasts.push({
                            title: "Impossible de modifier le produit",
                            content: "Une erreur a été rencontrée lors de la modification du produit.",
                            type: "danger",
                        });
                    }
                })
                .finally(() => {
                    newState.loading = false;
                    setState(newState);
                });
        }
    }, [state, edit, toasts.push]);

    React.useEffect(() => {
        if (edit.current && state.lastProductId !== edit.current.id) {
            setState(s => {
                const newState = { ...s };

                const category = (categories || []).find(c => c.id === edit.current!.category_id) || null;
                newState.inputValues.title = edit.current?.title || '';
                newState.inputValues.description = edit.current?.description || '';
                newState.inputValues.category = category;
                newState.lastProductId = edit.current?.id || null;

                return newState;
            });
        }
    }, [edit.current, categories, state.lastProductId]);

    const handleCancel = React.useCallback(() => {
        edit.setCurrent(null);
    }, [state, edit]);

    return <>
        <Modal.Header closeButton>
            <Modal.Title>
                Modifier un produit
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-wrap justify-content-between add-product-modal-body px-5">
            <div className="col-5 my-3">
                <label htmlFor="product-title">Nom du produit *</label>
                <Input
                    type="text"
                    placeholder="Le nom de votre produit"
                    name="title"
                    id="product-title"
                    onChange={handleChange}
                    value={state.inputValues.title}
                    
                    options={{ error: state.validationMessages?.title }} />
            </div>
            <div className="col-5 my-3">
                <label htmlFor="product-description">
                    Description du produit *
                </label>
                <textarea
                    className="form-control  "
                    id="product-description"
                    onChange={handleChange}
                    name="description" value={state.inputValues.description}>
                </textarea>
            </div>
            <div className="col-5 my-3 d-flex justify-content-between">
                <div>
                    <h6>Catégorie du produit *</h6>
                    <SelectedCategory category={state.inputValues.category} />
                </div>
                <Button
                    type="button"
                    className="btn btn-outline-dark btn-sm align-self-start"
                    onClick={handleOpenCategorySelect}>Ouvrir <i className="fa fa-external-link"></i></Button>
            </div>
            <div className="col-12 my-4">
                <ProductVariantProvider>
                    <VariantsList />
                    <AddVariant />
                    <DeleteVariantsDialogue />
                </ProductVariantProvider>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button type="button" className="btn btn-outline-dark btn-sm" onClick={handleCancel}>Annuler</Button>
            <Button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                options={{ loading: state.loading }}>
                <i className="fa fa-check"></i> Enregistrer
            </Button>
        </Modal.Footer>
    </>
});

export default EditProductBody;

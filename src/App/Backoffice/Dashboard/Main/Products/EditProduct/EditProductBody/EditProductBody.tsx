import React from "react";
import { Modal } from "react-bootstrap";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import toFormatedString from "../../../../../../../utilities/helpers/toFormatedString";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import SelectedCategory from "../../../Categories/AddCategory/SelectedCategory/SelectedCategory";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import AddImages from "../../AddImages/AddImages";
import { useEditProduct } from "../../Products";
import { Category } from "../../../../../../../utilities/constants/types";
import useCategorySelect from "../../../../../../../utilities/minitiatures/CategorySelect/hooks/useCategorySelect";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { AxiosError } from "axios";
import { refreshProducts } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import appImage from "../../../../../../../utilities/helpers/appImage";
import { cancelProductUpdate, deleteProductImage, updateProduct } from "../../../../../../../utilities/api/actions";

const MAXIMAGES = 4;
const DEFAULTINPUTVALUES = {
    title: '',
    description: '',
    price: '' as number | '',
    inStock: '' as number | '',
    sale_price: '' as number | '',
    images: [] as Image[] & { id?: number }[],
    category: null as Category | null,
}

export type EditProductData = {
    id: number,
    title?: string,
    description?: string,
    price?: number,
    sale_price?: number,
    inStock?: number,
    images?: File[],
    category_id?: number,
}

const EditProductBody = React.memo(() => {
    const edit = useEditProduct();
    const categorySelect = useCategorySelect();
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        inputValues: DEFAULTINPUTVALUES,
        loading: false,
        validationMessages: null as null | { [key: string]: any },
        canCancelUpdate: false,
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

    const handleNumberInputChange = React.useCallback((value: number | '', e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setState(s => ({ ...s, inputValues: { ...s.inputValues, [name]: value } }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        if (edit.current) {
            setState(s => ({ ...s, loading: true }));
            const newState = { ...state };
            const { title, description, category, images, inStock, price, sale_price } = state.inputValues;
            const payload = { id: edit.current.id } as EditProductData;

            if (title && title !== edit.current.title) {
                payload.title = state.inputValues.title;
            }

            if (category && category.id !== edit.current.category?.id) {
                payload.category_id = category.id;
            }

            if (description && description !== edit.current.description) {
                payload.description = description;
            }

            if (inStock && inStock !== edit.current.inStock) {
                payload.inStock = inStock;
            }

            if (price && price !== edit.current.price) {
                payload.price = price;
            }

            if (sale_price && sale_price !== edit.current.sale_price) {
                payload.sale_price = sale_price;
            }

            if (images.length > 0 && images.some((image) => image.imageData !== null)) {
                payload.images = images.map(image => image.imageData!);
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

                    dispatch(refreshProducts());
                })
                .catch((error: AxiosError) => {
                    const { errors } = error.response?.data as { errors: null };
                    if (errors) {
                        newState.validationMessages = errors;
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

    const addImage = React.useCallback((image: Image) => {
        setState(s => {
            const images = [...s.inputValues.images];
            if (images.length <= MAXIMAGES) {
                images.push(image);
            }
            return { ...s, inputValues: { ...s.inputValues, images } };
        })
    }, []);

    const removeImage = React.useCallback((url: string) => {
        const newState = { ...state };
        const images = [...state.inputValues.images];
        const image = images.find(image => image.imageUrl === url);

        newState.inputValues.images = images.filter(image => image.imageUrl !== url);

        if (image?.id) {
            newState.canCancelUpdate = true;
            deleteProductImage(image.id);
        }

        setState(newState);
    }, [state]);

    React.useEffect(() => {
        if (edit.current) {
            const images = edit.current?.images.map(image => {
                return {
                    id: image.id,
                    imageUrl: appImage(image.name),
                    imageData: null,
                }
            }) || [];

            setState(s => {
                const newState = { ...s };

                newState.inputValues.title = edit.current?.title || '';
                newState.inputValues.description = edit.current?.description || '';
                newState.inputValues.category = edit.current?.category || null;
                newState.inputValues.images = images;
                newState.inputValues.inStock = edit.current?.inStock || '';
                newState.inputValues.price = edit.current?.price || '';
                newState.inputValues.sale_price = edit.current?.sale_price || '';

                return newState;
            });
        }
    }, [edit.current]);

    const handleCancel = React.useCallback(() => {
        state.canCancelUpdate && cancelProductUpdate(edit.current?.id!);
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
            <div className="col-5 my-3">
                <label htmlFor="product-price">
                    Prix du produit *
                </label>
                <NumberInput
                    placeholder="prix du produit"
                    id="product-price"
                    name="price"
                    onChange={handleNumberInputChange}
                    value={toFormatedString(state.inputValues.price)}
                    maxLength={8}
                    options={{ error: state.validationMessages?.price }} />
            </div>
            <div className="col-5 my-3">
                <label htmlFor="product-instock">Nombre en stock *</label>
                <NumberInput
                    onChange={handleNumberInputChange}
                    placeholder="nombre en stock"
                    id="product-instock"
                    name="inStock"
                    value={toFormatedString(state.inputValues.inStock)}
                    maxLength={8}
                    
                    options={{ error: state.validationMessages?.inStock }} />
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
            <div className="col-5 my-3">
                <label htmlFor="product-sale-price" className="form-label">Prix de promotion</label>
                <NumberInput
                    name="sale_price"
                    id="product-sale-price"
                    placeholder="Prix en promotion"
                    aria-describedby="product-sale-price-help"
                    onChange={handleNumberInputChange}
                    value={toFormatedString(state.inputValues.sale_price)}
                    maxLength={8}
                    options={{ error: state.validationMessages?.sale_price }} />

                <small id="product-sale-price-help" className="text-muted">Ne remplir que si le produit est en promotion.</small>
            </div>
            <div className="col-8 my-3">
                <h6>
                    Images du produit
                </h6>
                <AddImages
                    addImage={addImage}
                    removeImage={removeImage}
                    images={state.inputValues.images}
                    count={MAXIMAGES} />
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
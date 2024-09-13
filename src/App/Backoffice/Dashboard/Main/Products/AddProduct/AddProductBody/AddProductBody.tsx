import React from "react";
import { Modal } from "react-bootstrap";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import SelectedCategory from "../../../Categories/AddCategory/SelectedCategory/SelectedCategory";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import useCategorySelect from "../../../../../../../utilities/minitiatures/CategorySelect/hooks/useCategorySelect";
import { Category } from "../../../../../../../utilities/constants/types";
import AddImages from "../../AddImages/AddImages";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import toFormatedString from "../../../../../../../utilities/helpers/toFormatedString";
import { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import truthyEntriesOnly from "../../../../../../../utilities/helpers/truthyEntriesOnly";
import { AxiosError } from "axios";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { refreshProducts } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import { createProduct } from "../../../../../../../utilities/api/actions";

type Props = {
    setShow: (show: boolean) => void
}

const MAXIMAGES = 4;
const DEFAULTINPUTVALUES = {
    title: '',
    description: '',
    price: '' as number | '',
    inStock: '' as number | '',
    images: [] as Image[],
    category: null as Category | null,
    sale_price: '' as number | '',
}

const AddProductBody = React.memo((props: Props) => {
    const toasts = useToasts();
    const categorySelect = useCategorySelect();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        inputValues: DEFAULTINPUTVALUES,
        loading: false,
        validationMessages: null as null | { [key: string]: any }
    });

    const HandleCategorySelectClose = React.useCallback((selected: Category | null) => {
        setState(s => ({ ...s, inputValues: { ...s.inputValues, category: selected } }))
    }, []);

    const handleOpenCategorySelect = React.useCallback(() => {
        categorySelect.open(HandleCategorySelectClose, state.inputValues.category?.id);
    }, [categorySelect.open, HandleCategorySelectClose, state.inputValues.category]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState(s => ({ ...s, inputValues: { ...s.inputValues, [name]: value } }));
    }, []);

    const handleNumberInputChange = React.useCallback((value: number | '', e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setState(s => ({ ...s, inputValues: { ...s.inputValues, [name]: value } }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        setState(s => ({ ...s, loading: true }));
        const newState = { ...state };

        const payload = truthyEntriesOnly({
            title: state.inputValues.title,
            inStock: state.inputValues.inStock || 0,
            category_id: state.inputValues.category?.id,
            price: state.inputValues.price || 0,
            description: state.inputValues.description,
        }) || {};

        if (state.inputValues.images.length > 0) {
            payload.images = state.inputValues.images.map(image => image.imageData!);
        }

        createProduct(payload)
            .then(() => {
                newState.inputValues = DEFAULTINPUTVALUES;

                props.setShow(false);
                toasts.push({
                    title: "Produit créé!",
                    content: "Le produit a été créé avec succès",
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
                        title: "Impossible de créer le produit",
                        content: "Une erreur a été rencontrée lors de la création du produit.",
                        type: "danger",
                    });
                }
            })
            .finally(() => {
                newState.loading = false;
                setState(newState);
            });
    }, [state, props.setShow, toasts.push]);

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
        setState(s => {
            const images = [...s.inputValues.images].filter(image => image.imageUrl !== url);
            return { ...s, inputValues: { ...s.inputValues, images } };
        });
    }, []);

    return <>
        <Modal.Header closeButton>
            <Modal.Title>
                Création d'un produit
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
                    aria-describedby="produc-sale-price-help"
                    onChange={handleNumberInputChange}
                    options={{ error: state.validationMessages?.sale_price }} />

                <small id="produc-sale-price-help" className="text-muted">Ne remplir que si le produit est en promotion.</small>
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
            <Button type="button" className="btn btn-outline-dark btn-sm" onClick={() => props.setShow(false)}>Annuler</Button>
            <Button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                options={{ loading: state.loading }}>
                <i className="fa fa-check"></i> Enregistrer
            </Button>
        </Modal.Footer>
    </>
})

export default AddProductBody;
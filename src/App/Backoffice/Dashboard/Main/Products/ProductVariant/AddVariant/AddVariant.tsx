import React from "react";
import ImageInputDD, { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import getValidationMessages from "../../../../../../../utilities/helpers/getValidationMessages";
import getFormData from "../../../../../../../utilities/helpers/getFormData";
import { useVariant } from "../../Products";
import { ProductVariant } from "../../../../../../../utilities/constants/types";
import { AxiosError } from "axios";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { refreshProducts } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import { createProductVariant } from "../../../../../../../utilities/api/actions";

type Payload = {
    name?: string,
    price?: number,
    image?: string,
    product_id?: number,
    inStock?: number,
}

type FormInputData = {
    product_variant_name?: string,
    product_variant_price?: number,
}

const DEFAULT_IMAGE: Image = {
    imageUrl: '',
    imageData: null
}

const Number = '' as number | '';

const DEFAULT_STATE = {
    image: DEFAULT_IMAGE,
    price: Number,
    name: '',
    inStock: Number,
    loading: false,
    validationMessages: null as Payload | null
}

const AddVariant = React.memo(() => {
    const { current, setCurrent } = useVariant();
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState(DEFAULT_STATE);

    const handleAddImage = React.useCallback((image: Image) => {
        setState(s => ({ ...s, image }));
    }, []);

    const handleRemoveImage = React.useCallback(() => {
        setState(s => ({ ...s, image: DEFAULT_IMAGE }))
    }, []);

    const handleNumberChange = React.useCallback((value: number | '', e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;

        switch (name) {
            case 'product_variant_price':
                setState(s => ({ ...s, price: value }));

                break;

            case 'product_variant_inStock':
                setState(s => ({ ...s, inStock: value }));
                break;

            default:
                break;
        }
    }, []);

    const handleNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, name: value }));
    }, []);

    const allowed = React.useMemo(() => Boolean(
        state.image.imageData &&
        state.name &&
        state.inStock), [state]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormInputData = getFormData(e);

        const errors = getValidationMessages<FormInputData>(formData);
        let validationMessages: Payload | null = null;

        if (errors) {
            const { product_variant_price, product_variant_name, ...messages } = errors;
            validationMessages = { ...messages };

            if (product_variant_price) validationMessages.price = product_variant_price;
            if (product_variant_name) validationMessages.name = product_variant_name;
        }

        setState(s => ({ ...s, validationMessages, loading: !validationMessages }));

        if (!validationMessages && current) {
            let newState = { ...state };

            const payload = {
                name: state.name,
                price: state.price || 0,
                inStock: state.inStock || 1,
                image: state.image.imageData!,
                product_id: current.id,
            }

            createProductVariant(payload)
                .then(response => {
                    const variant = response.data?.variant as ProductVariant;
                    const newCurrent = { ...current, variants: [...current.variants, variant] }


                    toasts.push({
                        title: "Variant ajouté",
                        content: "Le nouveau variant pour le produit a été enregistré",
                        type: "success",
                    });

                    setCurrent(newCurrent);
                    newState = DEFAULT_STATE;
                    dispatch(refreshProducts());
                })
                .catch((error: AxiosError) => {
                    const data = error.response?.data as { errors: Payload };

                    switch (error.response?.status) {
                        case 422:
                            newState.validationMessages = data.errors;
                            break;

                        default:
                            break;
                    }
                })
                .finally(() => {
                    newState.loading = false;
                    setState(newState);
                });
        }
    }, [allowed, state, current]);

    return <form className="add-variant-container product-variant-section" onSubmit={handleSubmit}>
        <h4 className="product-variant-section-title">Créér un variant</h4>
        <div className="add-variant-image">
            <div className="mb-2">Image du variant *</div>
            <ImageInputDD
                addImage={handleAddImage}
                removeImage={handleRemoveImage}
                id="add-variant-image"
                imageUrl={state.image.imageUrl}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="add-variant-name" className="form-label">Nom du variant *</label>
            <Input
                type="text"
                name="product_variant_name"
                id="add-variant-name"
                className="form-control"
                placeholder="Nom du variant"
                value={state.name}
                onChange={handleNameChange}
                options={{ error: state.validationMessages?.name }}
                required
            />
        </div>

        <div className="mb-3">
            <label htmlFor="price" className="form-label">Prix du variant</label>
            <NumberInput
                onChange={handleNumberChange}
                value={state.price.toLocaleString()}
                className="add-variant-price"
                name="product_variant_price"
                id="price"
                placeholder="Prix du variant"
                aria-describedby="add-variant-price-help"
                options={{ error: state.validationMessages?.price }} />

            <small id="add-variant-price-help" className="text-muted">Si défini, ce prix sera le prix du produit affiché</small>
        </div>

        <div className="mb-3">
            <label htmlFor="inStock" className="form-label">Nombre en stock *</label>
            <NumberInput
                onChange={handleNumberChange}
                value={state.inStock.toLocaleString()}
                className="add-variant-inStock"
                name="product_variant_inStock"
                id="inStock"
                placeholder="Prix du variant"
                aria-describedby="add-variant-inStock-help"
                options={{ error: state.validationMessages?.inStock }}
                required />

            <small id="add-variant-inStock-help" className="text-muted">Le nombre de stock pour ce variant</small>
        </div>

        <div className="add-product-variant-action">
            <Button
                type="submit"
                className="btn btn-secondary"
                disabled={!allowed}
                options={{ loading: state.loading }}>
                Ajouter
            </Button>
        </div>
    </form>
});

export default AddVariant;
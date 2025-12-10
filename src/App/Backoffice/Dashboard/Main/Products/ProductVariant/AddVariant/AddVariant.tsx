import React from "react";
import ImageInputDD, { Image } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import getValidationMessages from "../../../../../../../utilities/helpers/getValidationMessages";
import getFormData from "../../../../../../../utilities/helpers/getFormData";
import { useVariant, useProducts } from "../../Products";
import { ProductVariant } from "../../../../../../../utilities/constants/types";
import { AxiosError } from "axios";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { createProductVariant } from "../../../../../../../utilities/api/actions";

type Payload = {
    name?: string,
    price?: number,
    image?: string,
    product_id?: number,
    inStock?: number,
    sku?: string,
    special_price?: number,
    stock?: number,
    attributes?: { [key: string]: string },
}

type FormInputData = {
    product_variant_name?: string,
    product_variant_price?: number,
    product_variant_special_price?: number,
    product_variant_sku?: string,
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
    special_price: Number,
    sku: '',
    attributes: [] as { key: string, value: string }[],
    loading: false,
    validationMessages: null as Payload | null
}

const AddVariant = React.memo(() => {
    const { current, setCurrent } = useVariant();
    const { reloadProducts } = useProducts();
    const toasts = useToasts();

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

            case 'product_variant_special_price':
                setState(s => ({ ...s, special_price: value }));
                break;

            default:
                break;
        }
    }, []);

    const handleNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, name: value }));
    }, []);

    const handleSkuChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, sku: value }));
    }, []);

    const addAttributeRow = React.useCallback(() => {
        setState(s => ({ ...s, attributes: [...s.attributes, { key: '', value: '' }] }));
    }, []);

    const removeAttributeRow = React.useCallback((index: number) => {
        setState(s => ({ ...s, attributes: s.attributes.filter((_, i) => i !== index) }));
    }, []);

    const handleAttributeChange = React.useCallback((index: number, field: 'key' | 'value', val: string) => {
        setState(s => ({
            ...s,
            attributes: s.attributes.map((row, i) => i === index ? { ...row, [field]: val } : row)
        }));
    }, []);

    const attributesValid = React.useMemo(() => state.attributes.every(r => (
        (r.key === '' && r.value === '') || (r.key !== '' && r.value !== '')
    )), [state.attributes]);

    const allowed = React.useMemo(() => Boolean(
        state.image.imageData &&
        state.name &&
        state.inStock &&
        attributesValid), [state, attributesValid]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormInputData = getFormData(e);

        const errors = getValidationMessages<FormInputData>(formData);
        let validationMessages: Payload | null = null;

        if (errors) {
            const { product_variant_price, product_variant_name, product_variant_special_price, product_variant_sku } = errors;
            const vm: Payload = {};
            if (product_variant_price) vm.price = product_variant_price as unknown as number;
            if (product_variant_name) vm.name = product_variant_name as unknown as string;
            if (product_variant_special_price) vm.special_price = product_variant_special_price as unknown as number;
            if (product_variant_sku) vm.sku = product_variant_sku as unknown as string;
            validationMessages = Object.keys(vm).length ? vm : null;
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
                special_price: state.special_price || undefined,
                sku: state.sku || undefined,
                attributes: state.attributes.reduce((acc, cur) => {
                    if (cur.key && cur.value) acc[cur.key] = cur.value;
                    return acc;
                }, {} as { [key: string]: string }),
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
                    reloadProducts();
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
            <label htmlFor="special_price" className="form-label">Prix promotionnel</label>
            <NumberInput
                onChange={handleNumberChange}
                value={state.special_price.toLocaleString()}
                className="add-variant-special-price"
                name="product_variant_special_price"
                id="special_price"
                placeholder="Prix promotionnel"
            />
        </div>

        <div className="mb-3">
            <label htmlFor="sku" className="form-label">SKU</label>
            <Input
                type="text"
                name="product_variant_sku"
                id="sku"
                className="form-control"
                placeholder="SKU"
                value={state.sku}
                onChange={handleSkuChange}
            />
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

        <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label">Attributs</label>
                <Button type="button" className="btn btn-outline-secondary btn-sm" onClick={addAttributeRow}>Ajouter un attribut</Button>
            </div>
            <div className="d-flex flex-column gap-2">
                {state.attributes.map((row, i) => (
                    <div className="d-flex gap-2" key={i}>
                        <Input type="text" className="form-control" placeholder="Nom" value={row.key} onChange={e => handleAttributeChange(i, 'key', e.target.value)} />
                        <Input type="text" className="form-control" placeholder="Valeur" value={row.value} onChange={e => handleAttributeChange(i, 'value', e.target.value)} />
                        <Button type="button" className="btn btn-outline-danger" onClick={() => removeAttributeRow(i)}>Supprimer</Button>
                    </div>
                ))}
            </div>
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

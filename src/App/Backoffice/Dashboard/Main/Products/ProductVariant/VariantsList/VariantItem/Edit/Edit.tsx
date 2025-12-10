import React from "react";
import ImageInputDD, { Image } from "../../../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import { PartialsProps } from "../VariantItem";
import Input from "../../../../../../../../../utilities/minitiatures/Input/Input";
import NumberInput from "../../../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import { Dropdown } from "react-bootstrap";
import appImage from "../../../../../../../../../utilities/helpers/appImage";
import changedDataOnly from "../../../../../../../../../utilities/helpers/changedDataOnly";
import useToasts from "../../../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { AxiosError } from "axios";
import usePagePreloader from "../../../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { useVariant, useProducts } from "../../../../Products";
import arrayReplace from "../../../../../../../../../utilities/helpers/arrayReplace";
import { ProductVariant } from "../../../../../../../../../utilities/constants/types";
import { updateProductVariant } from "../../../../../../../../../utilities/api/actions";

type Edits = {
    name: string,
    price: number | '',
    inStock: number | '',
    image: Image,
    special_price: number | '',
    sku: string,
}

export type EditProductVariantData = {
    name?: string,
    price?: number,
    image?: File,
    inStock?: number,
    special_price?: number,
    sku?: string,
}

type ValidationMessages = {
    name?: string,
    price?: string,
    inStock?: string,
    special_price?: string,
    sku?: string,
}

const DEFAULT_EDIT_IMAGE: Image = {
    imageData: null,
    imageUrl: '',
}

const DEFAULT_EDITS: Edits = {
    name: '',
    price: '',
    inStock: '',
    image: { ...DEFAULT_EDIT_IMAGE },
    special_price: '',
    sku: '',
}

const Edit = React.memo((props: PartialsProps) => {
    const { variant, toggleEditMode } = props;
    const toasts = useToasts();
    const { reloadProducts } = useProducts();
    const pagePreloader = usePagePreloader();
    const contextVariant = useVariant();

    const [state, setState] = React.useState({
        edits: DEFAULT_EDITS,
        validationMessages: null as ValidationMessages | null,
    });

    const handleAddImage = React.useCallback((image: Image) => {
        setState(s => ({ ...s, edits: { ...s.edits, image } }));
    }, []);

    const handleRemoveImage = React.useCallback(() => {
        setState(s => ({ ...s, edits: { ...s.edits, image: DEFAULT_EDIT_IMAGE } }))
    }, []);

    const handleNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, edits: { ...s.edits, name: value } }));
    }, []);

    const handleSkuChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, edits: { ...s.edits, sku: value } }));
    }, []);

    const handleNumberChange = React.useCallback((value: number | '', e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        console.log(name, value);

        switch (name) {
            case 'product_variant_price':
                setState(s => ({ ...s, edits: { ...s.edits, price: value } }));

                break;

            case 'product_variant_in_stock':
                setState(s => ({ ...s, edits: { ...s.edits, inStock: value } }));
                break;

            case 'product_variant_special_price':
                setState(s => ({ ...s, edits: { ...s.edits, special_price: value } }));
                break;

            default:
                break;
        }
    }, []);

    const handleSubmit = React.useCallback(() => {
        const { image, ...newData } = state.edits;

        let edited: EditProductVariantData | null = changedDataOnly(newData, {
            name: variant.name,
            price: variant.price,
            inStock: variant.inStock,
            special_price: variant.special_price ?? undefined,
            sku: variant.sku ?? undefined,
        });

        if (image.imageData) {
            if (edited) {
                edited.image = image.imageData;
            } else {
                edited = { image: image.imageData };
            }
        }

        if (edited) {
            const newState = { ...state };
            pagePreloader.enable();

            updateProductVariant(variant.id, edited)
                .then((response) => {
                    const newVariant = response.data?.variant as ProductVariant;

                    if (newVariant && contextVariant.current) {
                        const newProduct = {
                            ...contextVariant.current,
                            variants: arrayReplace(
                                (current) => current.id === variant.id,
                                newVariant,
                                contextVariant.current.variants)
                        }

                        contextVariant.setCurrent(newProduct)
                    }

                    toasts.push({
                        title: "Variant mis à jour.",
                        content: "Les nouvelles informations du variant ont été sauvegardées",
                        type: "success",
                    });

                    newState.edits = { ...DEFAULT_EDITS };
                    toggleEditMode();
                    reloadProducts();
                })
                .catch((error: AxiosError) => {
                    switch (error.response?.status) {
                        case 422:
                            const data = error.response?.data as { errors: ValidationMessages };
                            newState.validationMessages = data.errors;
                            break;

                        default:
                            toasts.push({
                                title: "Modifications non sauvegardées.",
                                content: "Une erreur s'est produite lors de la modification du variant",
                                type: "danger",
                            });
                            break;
                    }
                })
                .finally(() => {
                    setState(newState);
                    pagePreloader.disable();
                });
        } else {
            toggleEditMode();
        }
    }, [variant, state, toasts.push, toggleEditMode, pagePreloader, contextVariant.current]);

    React.useEffect(() => {
        const newEdits: Edits = { ...DEFAULT_EDITS };

        newEdits.name = variant.name;
        newEdits.price = variant.price;
        newEdits.image.imageUrl = appImage(variant.image);
        newEdits.inStock = variant.inStock;
        newEdits.special_price = (variant.special_price ?? '') as number | '';
        newEdits.sku = variant.sku ?? '';

        setState(s => ({ ...s, edits: newEdits }))
    }, [variant]);

    return <>
        <td>
            <ImageInputDD
                imageUrl={state.edits.image.imageUrl}
                addImage={handleAddImage}
                removeImage={handleRemoveImage}
                id="edit-variant-item-image"
                className="edit-image"
            />
        </td>
        <td className="variant-item-name">
            <Input
                type="text"
                value={state.edits.name}
                onChange={handleNameChange}
                options={{ error: state.validationMessages?.name }} />
        </td>
        <td className="variant-item-price">
            <NumberInput
                value={state.edits.price.toLocaleString()}
                onChange={handleNumberChange}
                options={{ error: state.validationMessages?.price }}
                name="product_variant_price" />
        </td>
        <td className="variant-item-special-price">
            <NumberInput
                value={state.edits.special_price.toLocaleString()}
                onChange={handleNumberChange}
                options={{ error: state.validationMessages?.special_price }}
                name="product_variant_special_price" />
        </td>
        <td className="variant-item-sku">
            <Input
                type="text"
                value={state.edits.sku}
                onChange={handleSkuChange}
                options={{ error: state.validationMessages?.sku }} />
        </td>
        <td className="variant-item-instock">
            <NumberInput
                value={state.edits.inStock.toLocaleString()}
                onChange={handleNumberChange}
                options={{ error: state.validationMessages?.inStock }}
                name="product_variant_in_stock" />
        </td>
        <td>
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={handleSubmit}>
                        <i className="fa fa-check"></i> Sauvegarder
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="text-muted"
                        onClick={toggleEditMode}>
                        <i className="fa fa-xmark"></i> Annuler
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </>
});

export default Edit;

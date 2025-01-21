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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../../../utilities/redux/store";
import { refreshProducts } from "../../../../../../../../../utilities/redux/backoffice/backofficeSlice";
import usePagePreloader from "../../../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { useVariant } from "../../../../Products";
import arrayReplace from "../../../../../../../../../utilities/helpers/arrayReplace";
import { ProductVariant } from "../../../../../../../../../utilities/constants/types";
import { updateProductVariant } from "../../../../../../../../../utilities/api/actions";

type Edits = {
    name: string,
    price: number | '',
    inStock: number | '',
    image: Image,
}

export type EditProductVariantData = {
    name?: string,
    price?: number,
    image?: File,
    inStock?: number,
}

type ValidationMessages = {
    name?: string,
    price?: string,
    inStock?: string,
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
}

const Edit = React.memo((props: PartialsProps) => {
    const { variant, toggleEditMode } = props;
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();
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
                    dispatch(refreshProducts());
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
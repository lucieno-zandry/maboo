import React from "react";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import getValidationMessages from "../../../../../../../utilities/helpers/getValidationMessages";
import getFormData from "../../../../../../../utilities/helpers/getFormData";
import { useColor } from "../../Products";
import { ProductColor } from "../../../../../../../utilities/constants/types";
import { AxiosError } from "axios";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { refreshProducts } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import { HexColorPicker } from "react-colorful";
import ColorBubble from "../../../../../../../utilities/minitiatures/ColorBubble/ColorBubble";
import { createProductColor } from "../../../../../../../utilities/api/actions";

type Payload = {
    name?: string,
    code?: string,
    product_id?: number,
}

type FormInputData = {
    product_color_name?: string,
    product_color_code?: string,
}

const DEFAULT_STATE = {
    name: '',
    code: '#000000',
    loading: false,
    validationMessages: null as Payload | null
}

const AddColor = React.memo(() => {
    const { current, setCurrent } = useColor();
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState(DEFAULT_STATE);

    const handleNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, name: value }));
    }, []);

    const handleCodeChange = React.useCallback((code: string) => {
        setState(s => ({ ...s, code }))
    }, []);

    const allowed = React.useMemo(() => Boolean(state.code && state.name), [state.code, state.name]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormInputData = getFormData(e);

        const errors = getValidationMessages<FormInputData>(formData);
        let validationMessages: Payload | null = null;

        if (errors) {
            const { product_color_code, product_color_name, ...messages } = errors;
            validationMessages = { ...messages };

            if (product_color_code) validationMessages.code = product_color_code;
            if (product_color_name) validationMessages.name = product_color_name;
        }

        setState(s => ({ ...s, validationMessages, loading: !validationMessages }));

        if (!validationMessages && current) {
            let newState = { ...state };

            const payload = {
                name: state.name,
                code: state.code,
                product_id: current.id,
            }

            createProductColor(payload)
                .then(response => {
                    const color = response.data?.color as ProductColor;
                    const newCurrent = { ...current, colors: [...current.colors, color] }


                    toasts.push({
                        title: "Color ajouté",
                        content: "Le nouveau color pour le produit a été enregistré",
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

    return <form className="add-color-container product-color-section" onSubmit={handleSubmit}>
        <h4 className="product-color-section-title">Créér une couleur</h4>
        <div className="add-color-code">
            <div className="mb-2">Choisir la couleur *</div>
            <HexColorPicker color={state.code} onChange={handleCodeChange} />
        </div>
        <div>
            <div>Aperçu de la couleur</div>
            <ColorBubble
                color={state.code}
                size="lg"
                className="mx-auto mt-2"/>
        </div>

        <div className="mb-3">
            <label htmlFor="add-color-name" className="form-label">Nom de la couleur*</label>
            <Input
                type="text"
                name="product_color_name"
                id="add-color-name"
                className="form-control"
                placeholder="Nom de la couleur"
                value={state.name}
                onChange={handleNameChange}
                options={{ error: state.validationMessages?.name }}
                required
            />
        </div>

        <div className="add-product-color-action">
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

export default AddColor;
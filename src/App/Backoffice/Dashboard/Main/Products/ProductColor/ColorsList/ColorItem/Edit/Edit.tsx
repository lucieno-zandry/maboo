import React from "react";
import { PartialsProps } from "../ColorItem";
import Input from "../../../../../../../../../utilities/minitiatures/Input/Input";
import { Dropdown } from "react-bootstrap";
import changedDataOnly from "../../../../../../../../../utilities/helpers/changedDataOnly";
import useToasts from "../../../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../../../utilities/redux/store";
import { refreshProducts } from "../../../../../../../../../utilities/redux/backoffice/backofficeSlice";
import usePagePreloader from "../../../../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { useColor } from "../../../../Products";
import arrayReplace from "../../../../../../../../../utilities/helpers/arrayReplace";
import { ProductColor } from "../../../../../../../../../utilities/constants/types";
import { HexColorPicker } from "react-colorful";
import { updateProductColor } from "../../../../../../../../../utilities/api/actions";

type Edits = {
    name: string,
    code: string,
}

export type EditProductColorData = {
    name?: string,
    code?: string,
}

type ValidationMessages = {
    name?: string,
    code?: string,
}

const DEFAULT_EDITS: Edits = {
    name: '',
    code: '',
}

const Edit = React.memo((props: PartialsProps) => {
    const { color, toggleEditMode } = props;
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();
    const pagePreloader = usePagePreloader();
    const contextColor = useColor();

    const [state, setState] = React.useState({
        edits: DEFAULT_EDITS,
        validationMessages: null as ValidationMessages | null,
    });

    const handleNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(s => ({ ...s, edits: { ...s.edits, name: value } }));
    }, []);

    const handleColorChange = React.useCallback((code: string) => {
        setState(s => ({ ...s, edits: { ...s.edits, code } }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        const edited: EditProductColorData | null = changedDataOnly(state.edits, { name: color.name, code: color.code });

        if (edited) {
            const newState = { ...state };
            pagePreloader.enable();

            updateProductColor(color.id, edited)
                .then((response) => {
                    const newColor = response.data?.color as ProductColor;

                    if (newColor && contextColor.current) {
                        const newProduct = {
                            ...contextColor.current,
                            colors: arrayReplace(
                                (current) => current.id === color.id,
                                newColor,
                                contextColor.current.colors)
                        }

                        contextColor.setCurrent(newProduct)
                    }

                    toasts.push({
                        title: "Couleur mise à jour.",
                        content: "Les nouvelles informations de la couleur ont été sauvegardées",
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
                                content: "Une erreur s'est produite lors de la modification de la couleur",
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
    }, [color, state, toasts.push, toggleEditMode, pagePreloader, contextColor.current]);

    React.useEffect(() => {
        const newEdits: Edits = { ...DEFAULT_EDITS };

        newEdits.name = color.name;
        newEdits.code = color.code;

        setState(s => ({ ...s, edits: newEdits }))
    }, [color]);

    return <>
        <td>
            <HexColorPicker
                onChange={handleColorChange}
                color={state.edits.code} />
        </td>
        <td className="color-item-name">
            <Input
                type="text"
                value={state.edits.name}
                onChange={handleNameChange}
                options={{ error: state.validationMessages?.name }} />
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
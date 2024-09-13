import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import { useDeleteProductColor } from "../ProductColor";
import valuesOf from "../../../../../../../utilities/helpers/valuesOf";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { refreshProducts } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { useColor } from "../../Products";
import { deleteProductColors } from "../../../../../../../utilities/api/actions";

const DeleteColorsDialogue = React.memo(() => {
    const { currents, setCurrents } = useDeleteProductColor();
    const color = useColor();

    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        loading: false,
    });

    const handleDelete = React.useCallback(() => {
        if (currents.length > 0) {
            const colorsIds = valuesOf<number>('id', currents);
            setState(s => ({ ...s, loading: true }));
            deleteProductColors(colorsIds)
                .then(() => {
                    if (color.current) {
                        const newCurrentColor = {
                            ...color.current,
                            colors: color.current.colors.filter(color => !colorsIds.includes(color.id))
                        }

                        color.setCurrent(newCurrentColor)
                    }

                    toasts.push({
                        title: "Colors supprimés",
                        content: "Les colors du produit ont été supprimés avec succès",
                        type: "success",
                    });

                    dispatch(refreshProducts())
                    setCurrents([]);
                })
                .catch(() => {
                    toasts.push({
                        title: "Suppression non terminée",
                        content: "Une erreur s'est produite lors de la suppression des colors",
                        type: "danger"
                    })
                })
                .finally(() => {
                    setState(s => ({ ...s, loading: false }));
                });
        }
    }, [toasts.push, currents, setCurrents, color.current]);

    return <Modal show={Boolean(currents.length)} centered className="nth-modal">
        <Modal.Header>
            <Modal.Title>
                Supprimer {currents.length} Couleur(s) ?
            </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => setCurrents([])}>
                Annuler
            </Button>
            <Button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
                options={{ loading: state.loading }}>
                <i className="fa fa-trash"></i> Supprimer
            </Button>
        </Modal.Footer>
    </Modal>
});

export default DeleteColorsDialogue;
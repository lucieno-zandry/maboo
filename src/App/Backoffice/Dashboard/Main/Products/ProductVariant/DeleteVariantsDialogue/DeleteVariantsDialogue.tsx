import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import { useDeleteProductVariant } from "../ProductVariant";
import valuesOf from "../../../../../../../utilities/helpers/valuesOf";
import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { refreshProducts } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { useVariant } from "../../Products";
import { deleteProductVariants } from "../../../../../../../utilities/api/actions";

const DeleteVariantsDialogue = React.memo(() => {
    const { currents, setCurrents } = useDeleteProductVariant();
    const variant = useVariant();

    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        loading: false,
    });

    const handleDelete = React.useCallback(() => {
        if (currents.length > 0) {
            const variantsIds = valuesOf<number>('id', currents);
            setState(s => ({ ...s, loading: true }));
            deleteProductVariants(variantsIds)
                .then(() => {
                    if (variant.current) {
                        const newCurrentVariant = {
                            ...variant.current,
                            variants: variant.current.variants.filter(variant => !variantsIds.includes(variant.id))
                        }

                        variant.setCurrent(newCurrentVariant)
                    }

                    toasts.push({
                        title: "Variants supprimés",
                        content: "Les variants du produit ont été supprimés avec succès",
                        type: "success",
                    });

                    dispatch(refreshProducts())
                    setCurrents([]);
                })
                .catch(() => {
                    toasts.push({
                        title: "Suppression non terminée",
                        content: "Une erreur s'est produite lors de la suppression des variants",
                        type: "danger"
                    })
                })
                .finally(() => {
                    setState(s => ({ ...s, loading: false }));
                });
        }
    }, [toasts.push, currents, setCurrents, variant.current]);

    return <Modal show={Boolean(currents.length)} centered className="nth-modal">
        <Modal.Header>
            <Modal.Title>
                Supprimer {currents.length} variant(s) ?
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

export default DeleteVariantsDialogue;
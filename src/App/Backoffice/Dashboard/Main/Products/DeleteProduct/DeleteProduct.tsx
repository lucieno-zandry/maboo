import React from "react";
import { Modal } from "react-bootstrap";
import { useDeleteProduct, useProducts } from "../Products";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import useToasts from "../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import Checkbox from "../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import RoundedImage from "../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import appImage from "../../../../../../utilities/helpers/appImage";
import { deleteProduct } from "../../../../../../utilities/api/actions";

const DeleteProduct = React.memo(() => {
    const onDelete = useDeleteProduct();
    const toasts = useToasts();
    const { reloadProducts } = useProducts();

    const [state, setState] = React.useState({
        loading: false,
    });

    const handleDelete = React.useCallback(() => {
        const productIds = onDelete.current?.map(product => product.id);

        if (productIds && productIds.length > 0) {
            setState(s => ({ ...s, loading: true }));
            const newState = { ...state };
            deleteProduct(productIds)
                .then(() => {
                    onDelete.setCurrent(null);

                    toasts.push({
                        title: "Produits supprimés",
                        content: "Les produits ont été supprimés avec succès",
                        type: "success",
                    })

                    reloadProducts();
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible de supprimer les produits!",
                        content: "Une erreur s'est produite lors de la suppression des produits.",
                        type: "danger",
                    })
                })
                .finally(() => {
                    newState.loading = false;
                    setState(newState);
                });
        }
    }, [onDelete, state, reloadProducts]);

    return <Modal show={Boolean(onDelete.current)} centered>
        <Modal.Header closeButton onHide={() => onDelete.setCurrent(null)}>
            Suppressions de produits
        </Modal.Header>
        <Modal.Body>
            <div className="on-deleting-products d-flex flex-column gap-2">
                {onDelete.current?.map((product) => {
                    const image = product.variants?.[0]?.image || null;
                    return <div
                        className="product-item d-flex gap-3 align-items-center"
                        key={product.id}>
                        <Checkbox
                            label=''
                            checked
                            disabled />

                        <RoundedImage
                            image={appImage(image) || undefined} />

                        <div >
                            {product.title}
                        </div>
                    </div>
                })}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button
                type='button'
                className="btn btn-sm btn-outline-dark"
                onClick={() => onDelete.setCurrent(null)}>
                Annuler
            </Button>
            <Button type="button"
                className="btn btn-danger btn-sm"
                options={{ loading: state.loading }}
                onClick={handleDelete}>
                <i className="fa fa-trash"></i> Supprimer
            </Button>
        </Modal.Footer>
    </Modal>
})

export default DeleteProduct;

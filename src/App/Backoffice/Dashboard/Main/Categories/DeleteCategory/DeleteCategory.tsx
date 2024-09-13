import React from "react";
import { Modal } from "react-bootstrap";
import { useDeleteCategory } from "../Categories";
import SelectedCategory from "../AddCategory/SelectedCategory/SelectedCategory";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { deleteCategories } from "../../../../../../utilities/api/admin/actions";
import valuesOf from "../../../../../../utilities/helpers/valuesOf";
import useToasts from "../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { refreshCategories } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import { AppDispatch } from "../../../../../../utilities/redux/store";

const DeleteCategory = React.memo(() => {
    const deleteCategory = useDeleteCategory();
    const dispatch = useDispatch<AppDispatch>();

    const deleting = React.useMemo(() => deleteCategory.deleting, [deleteCategory.deleting]);
    const { setDeleting } = React.useMemo(() => deleteCategory, [deleteCategory.setDeleting]);
    const toasts = useToasts();

    const [state, setState] = React.useState({
        loading: false,
    });

    const onHide = React.useCallback(() => {
        setDeleting(null);
    }, [setDeleting]);

    const handleDelete = React.useCallback(() => {
        if (deleting) {
            const categoryIds = valuesOf<number>('id', deleting);
            setState(s => ({ ...s, loading: true }));

            deleteCategories(categoryIds)
                .then(() => {
                    toasts.push({
                        title: "Catégorie(s) supprimée(s).",
                        content: "Les catégories ont été supprimées avec succès.",
                        type: 'success',
                    })

                    setDeleting(null);
                    dispatch(refreshCategories());
                })
                .catch(() => {
                    toasts.push({
                        title: 'Maboo a rencontré une erreur',
                        content: "Nous n'avons pas pu supprimer la catégorie, veuillez réessayer plus tard",
                        type: "danger",
                    })
                })
                .finally(() => {
                    setState(s => ({ ...s, loading: false }));
                });
        }
    }, [setDeleting, deleting]);

    return <Modal show={Boolean(deleting)} onHide={onHide} centered>
        <Modal.Header>
            <Modal.Title>
                <div>
                    Supprimer des catégories
                </div>
                <small className="modal-title-small">
                    Êtes vous-sûr(e) de supprimer ces catégories ainsi que toutes les sous-catégories associées ?
                </small>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-2 flex-column">
            {deleting?.map((category) => {
                return <SelectedCategory category={category} key={category.id} />
            })}
        </Modal.Body>
        <Modal.Footer>
            <Button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={onHide}>Annuler</Button>
            <Button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                options={{ loading: state.loading }}>
                <i className="fa fa-trash"></i> Supprimer
            </Button>
        </Modal.Footer>
    </Modal>
})

export default DeleteCategory;
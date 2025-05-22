import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import { useDeleteSeller } from "../SellersContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../utilities/redux/store";
import { deleteMultipleSellers } from "../../../../../../../utilities/redux/backoffice/backofficeSlice";
import "./DeleteSeller.scss";

/**
 * Composant pour la suppression d'un ou plusieurs vendeurs/professionnels
 * Affiche une boîte de dialogue de confirmation avant la suppression
 * Utilise l'API pour effectuer la suppression réelle
 */
const DeleteSeller = React.memo(() => {
    const { current, setCurrent } = useDeleteSeller();
    const dispatch = useDispatch<AppDispatch>();
    
    // Fermeture du modal
    const handleClose = React.useCallback(() => {
        setCurrent(null);
    }, [setCurrent]);

    // Confirmation de la suppression
    const handleConfirm = React.useCallback(() => {
        if (!current) return;
        
        // Récupérer les IDs des vendeurs à supprimer
        const sellerIds = current.map(seller => seller.id);
        
        // Appel à l'API pour supprimer les vendeurs sélectionnés
        dispatch(deleteMultipleSellers(sellerIds))
            .unwrap()
            .then(() => {
                // Fermer le modal immédiatement
                setCurrent(null);
                
                // Afficher un message de succès dans une notification temporaire
                showSuccessMessage(`${current.length} vendeur(s) supprimé(s) avec succès !`);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression des vendeurs:", error);
                // Afficher un message d'erreur
                setErrorMessage("Une erreur est survenue lors de la suppression. Veuillez réessayer.");
                setShowError(true);
            });
    }, [current, dispatch, setCurrent]);

    // Gestion des notifications de succès
    const [successMessage, setSuccessMessage] = React.useState("");
    const [showSuccess, setShowSuccess] = React.useState(false);
    
    // Gestion des notifications d'erreur
    const [errorMessage, setErrorMessage] = React.useState("");
    const [showError, setShowError] = React.useState(false);
    
    const showSuccessMessage = React.useCallback((message: string) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        
        // Fermer automatiquement après 3 secondes
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    }, []);

    // Texte du message de confirmation
    const confirmationMessage = React.useMemo(() => {
        if (!current) return "";
        
        if (current.length === 1) {
            return `Êtes-vous sûr de vouloir supprimer le professionnel "${current[0].name} ${current[0].firstname}" ?`;
        }
        
        return `Êtes-vous sûr de vouloir supprimer ${current.length} professionnels ?`;
    }, [current]);

    // Vérifier si des vendeurs sont sélectionnés pour la suppression
    if (!current) return null;

    return (
        <>
            <Modal show={Boolean(current)} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="confirmation-message">{confirmationMessage}</p>
                    
                    <div className="seller-list-to-delete">
                        {current.length > 1 && (
                            <ul>
                                {current.map(seller => (
                                    <li key={seller.id}>{seller.name} {seller.firstname}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={handleConfirm}>
                        Confirmer
                    </Button>
                    <button type="button" className="cancel-button" onClick={handleClose}>
                        Annuler
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Notification de succès */}
            {showSuccess && (
                <div className="success-alert">
                    <span>{successMessage}</span>
                    <button 
                        className="close-button" 
                        onClick={() => setShowSuccess(false)}
                    >
                        &times;
                    </button>
                </div>
            )}
            
            {/* Notification d'erreur */}
            {showError && (
                <div className="error-alert">
                    <span>{errorMessage}</span>
                    <button 
                        className="close-button" 
                        onClick={() => setShowError(false)}
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    );
});

export default DeleteSeller;

import React from "react";
import { User } from "../../../../../../../../utilities/constants/types";
import { useEditSeller } from "../../SellersContext";
import Checkbox from "../../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../../utilities/redux/store";
import { deleteSingleSeller } from "../../../../../../../../utilities/redux/backoffice/backofficeSlice";
import "./SellerRow.scss";

interface SellerRowProps {
    seller: User;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

/**
 * Composant qui affiche une ligne dans la liste des vendeurs/professionnels
 * Affiche les informations d'un vendeur et les boutons d'action
 * Utilise l'API pour les opérations de modification et suppression
 */
const SellerRow: React.FC<SellerRowProps> = React.memo(({ seller, isSelected, onSelect }) => {
    const { setCurrent: setEditSeller } = useEditSeller();
    const dispatch = useDispatch<AppDispatch>();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    
    // Gérer la mise à jour du vendeur
    const handleEdit = React.useCallback(() => {
        setEditSeller(seller);
    }, [seller, setEditSeller]);
    
    // Supprimer directement un vendeur (sans ouvrir le modal)
    const handleDelete = React.useCallback(async () => {
        try {
            setIsDeleting(true);
            setHasError(false);
            
            // Appel à l'API pour supprimer le vendeur
            await dispatch(deleteSingleSeller(seller.id)).unwrap();
        } catch (error) {
            console.error(`Erreur lors de la suppression du vendeur ${seller.id}:`, error);
            setHasError(true);
        } finally {
            setIsDeleting(false);
        }
    }, [seller.id, dispatch]);
    
    // Formatage du statut pour l'affichage
    const validationStatus = React.useMemo(() => {
        if (seller.validated_at) {
            return <span className="status-validated">Validé</span>;
        }
        return <span className="status-pending">En attente</span>;
    }, [seller.validated_at]);

    return (
        <div className="seller-row">
            <div className="seller-selection">
                <Checkbox 
                    checked={isSelected} 
                    onChange={() => onSelect(seller.id)} 
                    label="" 
                />
            </div>
            <div className="seller-id">{seller.id}</div>
            <div className="seller-name">{seller.name} {seller.firstname}</div>
            <div className="seller-email">{seller.email}</div>
            <div className="seller-phone">{seller.phone_number}</div>
            <div className="seller-status">{validationStatus}</div>
            <div className="seller-actions">
                <button className="btn-secondary" onClick={handleEdit} type="button">Mettre à jour</button>
                <button 
                    className={`btn-danger ${isDeleting ? 'loading' : ''} ${hasError ? 'error' : ''}`} 
                    onClick={handleDelete} 
                    type="button"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Suppression...' : hasError ? 'Réessayer' : 'Supprimer'}
                </button>
            </div>
        </div>
    );
});

export default SellerRow;

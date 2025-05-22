import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../../../../utilities/redux/store";
import SellerRow from "./SellerRow/SellerRow";
import { useDeleteSeller } from "../SellersContext";
import Checkbox from "../../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import "./SellersList.scss";
import "../SellerManagement.scss";
import { useFilterRow } from "../../../../../../../utilities/hooks/admin/useFilterRow";

/**
 * Composant qui affiche la liste des vendeurs/professionnels
 * Permet la sélection multiple pour la suppression
 */
const SellersList = React.memo(() => {
    const sellers = useSelector((state: Rootstate) => state.backoffice.sellers);
    const { setCurrent } = useDeleteSeller();
    const [selected, setSelected] = React.useState<number[]>([]);
    const [allSelected, setAllSelected] = React.useState(false);

    // adding filter row
    const filterRow = useFilterRow();
    
    // Gestion de la sélection/désélection de tous les vendeurs
    const handleSelectAll = React.useCallback(() => {
        if (!sellers) return;
        
        if (!allSelected) {
            const ids = sellers.map(seller => seller.id);
            setSelected(ids);
        } else {
            setSelected([]);
        }
        
        setAllSelected(!allSelected);
    }, [allSelected, sellers]);

    // Gestion de la sélection/désélection d'un vendeur
    const handleSelect = React.useCallback((id: number) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                // Si déjà sélectionné, le désélectionner
                const newSelected = prev.filter(item => item !== id);
                setAllSelected(false);
                return newSelected;
            } else {
                // Sinon, l'ajouter à la sélection
                const newSelected = [...prev, id];
                if (sellers && newSelected.length === sellers.length) {
                    setAllSelected(true);
                }
                return newSelected;
            }
        });
    }, [sellers]);
    
    // Fonction pour supprimer les vendeurs sélectionnés
    const handleDelete = React.useCallback(() => {
        if (!sellers || selected.length === 0) return;
        
        // Filtrer les vendeurs sélectionnés
        const selectedSellers = sellers.filter(seller => selected.includes(seller.id));
        // Ouvrir le modal de confirmation de suppression
        setCurrent(selectedSellers);
    }, [selected, sellers, setCurrent]);

    if (!sellers) return null;

    return (
        <div className="sellers-list">
            <div className="sellers-list-header">
                <div className="sellers-selection">
                    <Checkbox checked={allSelected} onChange={handleSelectAll} label="" />
                </div>
                <div className="sellers-id">ID</div>
                <div className="sellers-name">Nom</div>
                <div className="sellers-email">Email</div>
                <div className="sellers-phone">Téléphone</div>
                <div className="sellers-status">Statut</div>
                <div className="sellers-actions">Actions</div>
            </div>
            
            {selected.length > 0 && (
                <div className="sellers-bulk-actions">
                    <button 
                        className="btn-danger" 
                        onClick={handleDelete}
                    >
                        Supprimer ({selected.length})
                    </button>
                </div>
            )}
            
            <div className="sellers-items">
                {/* {sellers.map(seller => (
                    <SellerRow 
                        key={seller.id} 
                        seller={seller} 
                        isSelected={selected.includes(seller.id)}
                        onSelect={handleSelect}
                    />
                ))} */}
                {sellers?.map(seller => {
                const row = <SellerRow
                    key={seller.id}
                    seller={seller}
                    isSelected={selected.includes(seller.id)}
                    onSelect={handleSelect}
                />

                return filterRow([
                    seller?.name || '',
                    // product.price,
                    // product.sale_price,
                    // product.title,
                    seller?.email], row);
            })}
            </div>
        </div>
    );
});

export default SellersList;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../utilities/redux/store";
import Fade from "../../../../../../utilities/minitiatures/Fade/Fade";
import SellersList from "./SellersList/SellersList";
import TablePlaceholder from "../../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import SellersEmpty from "./SellersEmpty/SellersEmpty";
import AddSeller from "./AddSeller/AddSeller";
// Import with absolute path to resolve module not found error
import EditSeller from "../../../../../../App/Backoffice/Dashboard/Main/Seller/SellerManagement/EditSeller/EditSeller";
import DeleteSeller from "../../../../../../App/Backoffice/Dashboard/Main/Seller/SellerManagement/DeleteSeller/DeleteSeller";
import { User } from "../../../../../../utilities/constants/types";
import ScrollEnd from "../../../../../../utilities/minitiatures/ScrollEnd/ScrollEnd";
import { refreshSellers } from "../../../../../../utilities/redux/backoffice/backofficeSlice";
import { SellersContext, DEFAULT_EDIT, DEFAULT_DELETE } from "./SellersContext";

/**
 * Composant principal pour la gestion des vendeurs (professionnels)
 * Gère l'affichage de la liste des vendeurs, l'ajout, l'édition et la suppression
 */
const SellerManagement = React.memo(() => {
    // Récupération des vendeurs depuis le store Redux
    const sellers = useSelector((state: Rootstate) => state.backoffice.sellers);
    const dispatch = useDispatch<AppDispatch>();
    
    // États pour gérer l'édition et la suppression
    const [state, setState] = React.useState({
        edit: DEFAULT_EDIT,
        onDelete: DEFAULT_DELETE,
    });

    // Fonction pour définir le vendeur en cours d'édition
    const editSeller = React.useMemo(() => {
        const setCurrent = (seller: User | null) => {
            setState(prev => ({
                ...prev,
                edit: {
                    ...prev.edit,
                    current: seller
                }
            }));
        }

        return {
            current: state.edit.current,
            setCurrent
        }
    }, [state.edit.current]);

    // Fonction pour définir les vendeurs à supprimer
    const deleteSeller = React.useMemo(() => {
        const setCurrent = (sellers: User[] | null) => {
            setState(prev => ({
                ...prev,
                onDelete: {
                    ...prev.onDelete,
                    current: sellers
                }
            }));
        }

        return {
            current: state.onDelete.current,
            setCurrent,
        }
    }, [state.onDelete.current]);

    // Chargement initial des vendeurs
    React.useEffect(() => {
        if (!sellers) {
            dispatch(refreshSellers());
        }
    }, [sellers, dispatch]);

    return (
        <SellersContext.Provider value={{
            edit: editSeller,
            onDelete: deleteSeller,
        }}>
            <div className="sellers-management-container">
                {/* Affichage de la liste des vendeurs si disponible */}
                <Fade show={Boolean(sellers?.length)}>
                    <SellersList />
                </Fade>

                {/* Placeholder pendant le chargement */}
                <Fade show={!sellers}>
                    <TablePlaceholder />
                </Fade>

                {/* Message si aucun vendeur trouvé */}
                <Fade show={sellers?.length === 0}>
                    <SellersEmpty />
                </Fade>

                {/* Composants pour les actions CRUD */}
                <AddSeller />
                <EditSeller />
                <DeleteSeller />
                
                {/* Composant pour détecter le défilement jusqu'à la fin */}
                <ScrollEnd 
                    whileInView={() => dispatch(refreshSellers())} 
                    show={true}
                >
                    <div></div>
                </ScrollEnd>
            </div>
        </SellersContext.Provider>
    )
});

export default SellerManagement;

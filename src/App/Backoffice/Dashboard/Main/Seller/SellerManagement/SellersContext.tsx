import React from "react";
import { User } from "../../../../../../utilities/constants/types";

// Types pour définir la structure des contextes
export type EditContextType = {
    current: User | null;
    setCurrent: (seller: User | null) => void;
};

export type DeleteContextType = {
    current: User[] | null;
    setCurrent: (sellers: User[] | null) => void;
};

// Définition des types par défaut pour les contextes
export const DEFAULT_EDIT: EditContextType = {
    current: null,
    setCurrent: () => {}
};

export const DEFAULT_DELETE: DeleteContextType = {
    current: null,
    setCurrent: () => {}
};

// Création des contextes pour gérer l'édition et la suppression
export const SellersContext = React.createContext({
    edit: DEFAULT_EDIT,
    onDelete: DEFAULT_DELETE,
});

// Custom hook pour l'édition
export const useEditSeller = () => React.useContext(SellersContext).edit;

// Custom hook pour la suppression
export const useDeleteSeller = () => React.useContext(SellersContext).onDelete;

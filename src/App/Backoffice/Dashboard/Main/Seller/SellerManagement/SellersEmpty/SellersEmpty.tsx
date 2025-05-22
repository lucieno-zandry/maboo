import React from "react";
import "./SellersEmpty.scss";

/**
 * Composant affiché lorsque la liste des vendeurs est vide
 */
const SellersEmpty: React.FC = () => {
  return (
    <div className="sellers-empty">
      <div className="sellers-empty__content">
        <i className="fas fa-store-slash"></i>
        <h3>Aucun vendeur trouvé</h3>
        <p>Aucun vendeur n'a été ajouté au système. Utilisez le bouton "Ajouter un vendeur" pour commencer.</p>
      </div>
    </div>
  );
};

export default SellersEmpty;

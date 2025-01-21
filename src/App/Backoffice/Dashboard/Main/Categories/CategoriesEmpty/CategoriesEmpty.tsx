import React from "react";
import emptyBox from './empty-box.png';

const CategoriesEmpty = React.memo(() => {
    return <div className="page-empty-container">
        <img src={emptyBox} />
        <div className="display-6">
            Aucune catégorie trouvée
        </div>
    </div>
});

export default CategoriesEmpty;
import React from "react";
import emptyBox from './empty-box.png';

const RequestsEmpty = React.memo(() => {
    return <div className="page-empty-container">
        <img src={emptyBox} />
        <div className="display-6">
            Aucune demande en tant qu'administrateur.
        </div>
    </div>
});

export default RequestsEmpty;
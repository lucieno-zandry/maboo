import React from "react";
import waiting from './waiting.png';

const Validation = React.memo(() => {
    return <div className="validation-container d-flex flex-column justify-content-center align-items-center">
        <img src={waiting} width={200} height={200}/>
        <h3 className="display-6">En cours de validation!</h3>
        <p className="text-align-center">
            Votre compte est en cours de validation,
            vous recevrez un email dès qu'un administrateur aura validé votre compte.
        </p>
    </div>
});

export default Validation;
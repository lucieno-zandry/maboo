import React from "react";

const SESSION_REDIRECTED = 'SESSION_REDIRECTED'

export default function (pushToasts: Function) {
    React.useEffect(() => {
        const justRedirected = sessionStorage.getItem(SESSION_REDIRECTED);

        if (justRedirected && pushToasts) {
            pushToasts({
                title: "Identification requise!",
                content: "Veuillez vous connecter ou créer un compte pour pouvoir continuer",
                type: "default"
            })

            sessionStorage.removeItem(SESSION_REDIRECTED);
        }
    }, [pushToasts]);
}
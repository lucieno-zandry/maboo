import getValidationMessage from "./getValidationMessage"

type JsObject = {
    [key: string]: any,
}

/**
 * Applique une validation pour chaque entrée de l'objet
 * @param formData l'objet qui contient les données de formulaire
 * @returns l'objet qui contient les données de validation
 */
function getValidationMessages<Obj>(formData: JsObject): Obj | null {
    let messages = {} as JsObject;
    
    for (let name in formData) {
        const message = getValidationMessage(name, formData[name]);
        if (message) {
            messages = { ...messages, [name]: message }
        }
    }

    return (Object.keys(messages).length) ? messages as Obj : null;
}

export default getValidationMessages;
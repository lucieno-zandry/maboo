import getValidationMessage from "./getValidationMessage";

/**
 * Applique la validation des champs sur l'élément où la fonction est appelée
 * @param event L'évènement déclencher après enlèvement du focus
 * @param callback Une fonction appelée après la validation
 */
const handleInputBlur = (
    event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    callback: Function
) => {
    const { name, value } = event.target;
    const validationMessage = getValidationMessage(name, value);

    const validationsMessages = {
        [name]: validationMessage
    };

    callback(validationsMessages);
}

export default handleInputBlur;
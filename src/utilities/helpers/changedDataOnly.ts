type Data = { [key: string]: any }

/**
 * Compare deux objets et supprime les entrées qui correspondent dans les deux objets
 * @param newData Le nouvel objet
 * @param comparisonObject L'objet à faire la comparaison
 * @returns L'objet qui contient uniquement les entrées qui ne correspondent pas ou rien si les objets sont les mêmes
 */
const changedDataOnly = (newData: Data, comparisonObject: Data): Data | null => {
    let data = {} as Data;

    for (let key in newData) {
        if (comparisonObject[key] != newData[key]) {
            data[key] = newData[key];
        }
    }

    return Object.keys(data).length > 0 ? data : null;
}

export default changedDataOnly;
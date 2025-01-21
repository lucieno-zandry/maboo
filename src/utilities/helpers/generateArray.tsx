/**
 * Génère une liste arbitraire
 * @param size La taille de la liste
 * @param value Les valeurs de la liste
 * @returns La liste contenant les valeurs indiquées
 */
function generateArray(size: number = 6, value: string | number  = '') {
    var sizedArray = Array.apply(null, Array(size));
    var result = sizedArray.map(() => value);
    return result;
}

export default generateArray;
/**
 * Permet d'additionner une valeur de chaque élément d'une liste
 * @param array la liste à itérer
 * @param callback une fonction qui permet de déterminer la valeur à additionner
 * @returns La somme
 */
export default function arraySum<A>(array: A[], callback: (value: A) => number): number {
    let sum = 0;

    array.forEach(item => {
        sum += callback(item);
    })

    return sum;
}
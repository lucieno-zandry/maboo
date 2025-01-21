/**
 * Permet de remplacer un élément par un autre dans une liste
 * @param callback La fonction de comparaison pour trouver l'élément à remplacer
 * @param replace L'élément qui va remplacer 
 * @param array La liste sur laquelle travailler
 * @returns Une nouvelle liste avec le remplacement en dernière ligne
 */
export default function <T>(callback: (prop: T) => boolean, replace: T, array: T[]): T[] {
    const newArray = array.filter(value => !callback(value));
    newArray.push(replace);
    return newArray;
}
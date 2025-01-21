
const LOCALES = 'fr-FR';

/**
 * Formate un nombre en une chaine de caractère plus lisible
 * @param number Le nombre à formater
 * @returns Le nombre formaté
 */
export default function (number: number | string): string {
    if (number === 0 || number === "") {
        return '';
    }

    return number.toLocaleString(LOCALES)
}
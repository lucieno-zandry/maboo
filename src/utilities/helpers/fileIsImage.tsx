/**
 * Vérifie si le type d'un fichier est de type image.
 * @param file Le fichier à vérifier
 * @returns True si le fichier est de type image, sinon False.
 */
function fileIsImage(file: File) {

    const validImageTypes = [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/bmp',
        'image/svg+xml',
        'image/webp',     
        'image/avif'
    ];

    return validImageTypes.includes(file.type);
}

export default fileIsImage;
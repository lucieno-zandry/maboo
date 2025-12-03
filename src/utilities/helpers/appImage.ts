const APPSTORAGEPATH = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/storage/`;

/**
 * Obtiens le chemin complet de l'image à afficher
 * @param image une chaine de caractère, un fichier ou un blob qui représente l'image
 * @returns le chemin complet et approprié de l'image ou undefined
 */
const appImage = (image: string | File | Blob | null): string | undefined => {
    if (image) {
        if (typeof image === 'string') {
            const str = image as string;
            if (str.startsWith('http://') || str.startsWith('https://')) return str;
            if (str.startsWith('/')) return str;
            return APPSTORAGEPATH + str;
        }
        // Si c'est un File ou un Blob, on ne peut pas l'utiliser directement comme URL
        // On retourne undefined pour indiquer qu'il n'y a pas d'URL disponible
        return undefined;
    }

    return undefined;
}

export default appImage;

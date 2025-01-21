const APPSTORAGEPATH = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/storage/`;

/**
 * Obtiens le chemin complet de l'image à afficher
 * @param image une chaine de caractère qui représente le chemin de l'image
 * @returns le chemin complet et approprié de l'image
 */
const appImage = (image: string | null): string | undefined => {
    if (image) {
        return APPSTORAGEPATH + image;
    }

    return undefined;
}

export default appImage;
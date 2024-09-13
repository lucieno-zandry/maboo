import { Category } from "../constants/types";

/**
 * Permet d'obtenir le parent d'une catégorie
 * @param category La catégorie dont le parent est à chercher
 * @param categories La liste de catégorie dans laquelle chercher le parent
 * @returns Le parent de la catégorie ou null s'il n'y a pas de correspondance
 */
function getParentCategory(category: Category, categories: Category[]): Category | null {
    if (category.parent_id) {
        const parentCategory = categories.find(randomCategory => randomCategory.id === category.parent_id);

        if (parentCategory) {
            return parentCategory;
        }
    }

    return null
}

export default getParentCategory;
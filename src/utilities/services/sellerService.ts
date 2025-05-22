/**
 * Service pour gérer les opérations CRUD sur les vendeurs/professionnels
 * Intégration avec l'API backend réelle
 *
 * Ce service gère toutes les opérations liées aux vendeurs en utilisant
 * les endpoints de l'API backend.
 */

import { User } from '../constants/types';
import api from '../api/api';

// L'URL de base est maintenant gérée par le fichier api.ts via VITE_APP_API_URL

/**
 * Convertit les données de l'API en format User pour notre application
 * @param apiData - Données venant de l'API
 * @returns User - Données au format User
 */
const mapApiDataToUser = (apiData: any): User => ({
  id: apiData.id,
  name: apiData.name || '',
  firstname: apiData.firstname || '',
  email: apiData.email || '',
  phone_number: apiData.phone_number || '',
  validated_at: apiData.validated_at,
  adress: apiData.adress || '',
  type: 'SELLER',
  created_at: apiData.created_at || new Date().toISOString(),
  updated_at: apiData.updated_at || new Date().toISOString(),
  email_verified_at: apiData.email_verified_at,
  // Conversion de l'image en blob URL si nécessaire
  image: apiData.image || null
});

/**
 * Récupère la liste des vendeurs depuis l'API
 * @returns Promise<User[]> - Liste des vendeurs
 */
export const fetchSellers = async (): Promise<User[]> => {
  try {
    // Utiliser l'URL correcte selon les normes existantes
    const response = await api.get('/seller/all');

    // Vérifier si la réponse contient les données attendues
    if (!response.data || !response.data.sellers) {
      throw new Error('Format de réponse API inattendu');
    }

    // Mapper les données de l'API au format User
    return response.data.sellers.map(mapApiDataToUser);
  } catch (error) {
    console.error('Erreur lors de la récupération des vendeurs:', error);
    throw error;
  }
};

/**
 * Récupère un vendeur spécifique depuis l'API
 * @param id - ID du vendeur à récupérer
 * @returns Promise<User> - Données du vendeur
 */
export const fetchSellerById = async (id: number): Promise<User> => {
  try {
    // Utiliser l'URL correcte selon les normes existantes
    const response = await api.get(`/seller/get/${id}`);

    // Vérifier si la réponse contient les données attendues
    if (!response.data || !response.data.seller) {
      throw new Error('Format de réponse API inattendu');
    }

    // Mapper les données de l'API au format User
    return mapApiDataToUser(response.data.seller);
  } catch (error) {
    console.error(`Erreur lors de la récupération du vendeur ${id}:`, error);
    throw error;
  }
};

/**
 * Ajoute un nouveau vendeur via l'API
 * @param seller - Données du vendeur à ajouter (sans ID)
 * @returns Promise<User> - Vendeur ajouté (avec ID généré)
 */
export const addSeller = async (seller: Omit<User, 'id'>): Promise<User> => {
  try {
    // Préparation des données pour l'API
    const sellerData = {
      name: seller.name,
      firstname: seller.firstname,
      email: seller.email,
      phone_number: seller.phone_number,
      adress: seller.adress,
      password: (seller as any).password,
      password_confirmation: (seller as any).password_confirmation,
      type: 'SELLER',
      // Si l'image est fournie sous forme de chaîne base64, elle sera envoyée telle quelle
      // Si c'est un fichier, il faudrait utiliser FormData (voir ci-dessous)
      image: seller.image
    };

    console.log('Données du vendeur à envoyer:', sellerData);

    // Si l'image est une chaîne qui commence par "data:" ou "blob:", c'est déjà un format base64 ou une URL blob
    // Sinon, on suppose que c'est une URL normale et on l'envoie telle quelle
    let response;

    // Vérifier si l'image est un objet File ou Blob (cas où l'utilisateur a téléchargé une nouvelle image)
    if (typeof seller.image === 'object' && seller.image !== null) {
      const formData = new FormData();
      Object.entries(sellerData).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      // Ajouter l'image au FormData si elle existe
      if (seller.image) {
        formData.append('image', seller.image);
      }

      // Utiliser l'URL correcte selon les normes existantes
      response = await api.post('/seller/create', formData);
    } else {
      // Sinon, envoyer les données JSON normalement
      // Utiliser l'URL correcte selon les normes existantes
      response = await api.post('/seller/create', sellerData);
    }

    // Vérifier si la réponse contient les données attendues
    if (!response.data || !response.data.seller) {
      throw new Error('Format de réponse API inattendu');
    }

    // Retourner le vendeur créé
    return mapApiDataToUser(response.data.seller);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du vendeur:', error);
    throw error;
  }
};

/**
 * Met à jour un vendeur existant via l'API
 * @param seller - Données du vendeur à mettre à jour (avec ID)
 * @returns Promise<User> - Vendeur mis à jour
 */
export const updateSeller = async (seller: User): Promise<User> => {
  try {
    // Préparation des données pour l'API
    const sellerData = {
      id: seller.id,
      name: seller.name,
      firstname: seller.firstname,
      email: seller.email,
      phone_number: seller.phone_number,
      adress: seller.adress,
      type: 'SELLER',
      image: seller.image
    };

    // Si l'image est une chaîne qui commence par "data:" ou "blob:", c'est déjà un format base64 ou une URL blob
    // Sinon, on suppose que c'est une URL normale et on l'envoie telle quelle
    let response;

    // Vérifier si l'image est un objet File ou Blob (cas où l'utilisateur a téléchargé une nouvelle image)
    if (typeof seller.image === 'object' && seller.image !== null) {
      const formData = new FormData();
      Object.entries(sellerData).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      // Ajouter l'image au FormData si elle existe
      if (seller.image) {
        formData.append('image', seller.image);
      }

      // Utiliser l'URL correcte selon les normes existantes
      response = await api.post(`/seller/update/${seller.id}`, formData);
    } else {
      // Sinon, envoyer les données JSON normalement
      // Utiliser l'URL correcte selon les normes existantes
      response = await api.post(`/seller/update/${seller.id}`, sellerData);
    }

    // Vérifier si la réponse contient les données attendues
    if (!response.data || !response.data.seller) {
      throw new Error('Format de réponse API inattendu');
    }

    // Retourner le vendeur mis à jour
    return mapApiDataToUser(response.data.seller);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du vendeur ${seller.id}:`, error);
    throw error;
  }
};

/**
 * Supprime un vendeur via l'API
 * @param id - ID du vendeur à supprimer
 * @returns Promise<void>
 */
export const deleteSeller = async (id: number): Promise<void> => {
  try {
    // Utiliser l'URL correcte selon les normes existantes
    const response = await api.post(`/seller/delete/${id}`, {});

    // Vérifier si la suppression a réussi
    if (!response.data || response.data.status !== 'success') {
      throw new Error('Échec de la suppression du vendeur');
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du vendeur ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime plusieurs vendeurs via l'API
 * @param ids - Tableau d'IDs des vendeurs à supprimer
 * @returns Promise<void>
 */
export const deleteMultipleSellers = async (ids: number[]): Promise<void> => {
  try {
    // Utiliser l'URL correcte selon les normes existantes
    const response = await api.post('/seller/delete-multiple', { ids });

    // Vérifier si la suppression a réussi
    if (!response.data || response.data.status !== 'success') {
      throw new Error('Échec de la suppression multiple des vendeurs');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression multiple de vendeurs:', error);
    throw error;
  }
};

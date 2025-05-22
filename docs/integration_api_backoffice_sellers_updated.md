# Documentation d'intégration de l'API Backend pour la Gestion des Vendeurs

## Table des matières
1. [Introduction](#introduction)
2. [Architecture et flux de données](#architecture-et-flux-de-données)
3. [Service API (sellerService.ts)](#service-api-sellerservicets)
4. [Composants React](#composants-react)
5. [Gestion des images](#gestion-des-images)
6. [Gestion des erreurs](#gestion-des-erreurs)
7. [Tests et validation](#tests-et-validation)
8. [Annexes](#annexes)

## Introduction

Cette documentation détaille l'intégration complète de l'API backend pour la gestion des vendeurs (professionnels) dans l'application backoffice. L'implémentation remplace l'API simulée (JSONPlaceholder) par une API réelle, tout en optimisant le traitement des images pour utiliser des blobs au lieu de chaînes.

> **Note importante** : Le type `User` a été modifié pour accepter des objets `File` et `Blob` en plus des chaînes pour le champ `image`. Cette modification était nécessaire pour permettre le téléchargement d'images directement depuis l'interface utilisateur.

### Objectifs de l'intégration
- Connecter l'interface utilisateur aux endpoints API réels
- Optimiser le traitement des images (utilisation de blobs)
- Maintenir la cohérence avec les standards de code existants
- Assurer une gestion robuste des erreurs

### Endpoints API utilisés
- `GET /admin/sellers` - Récupérer la liste des vendeurs
- `GET /admin/sellers/:id` - Récupérer un vendeur spécifique
- `POST /admin/sellers` - Ajouter un nouveau vendeur
- `PUT /admin/sellers/:id` - Mettre à jour un vendeur existant
- `DELETE /admin/sellers/:id` - Supprimer un vendeur
- `POST /admin/sellers/delete-multiple` - Supprimer plusieurs vendeurs

## Architecture et flux de données

L'architecture suit le modèle Redux pour la gestion de l'état, avec des services API dédiés pour les opérations CRUD.

### Flux de données
1. **Composants React** → Déclenchent des actions Redux
2. **Actions Redux** → Appellent les services API
3. **Services API** → Communiquent avec le backend
4. **Reducers Redux** → Mettent à jour l'état de l'application
5. **Composants React** → Se mettent à jour en fonction du nouvel état

### Diagramme de séquence pour l'ajout d'un vendeur
```
AddSeller (React) → addSeller (Redux Action) → apiAddSeller (Service API) → API Backend → Redux Store → UI Update
```

## Service API (sellerService.ts)

Le fichier `sellerService.ts` contient toutes les fonctions nécessaires pour interagir avec l'API backend.

### Configuration de base
L'URL de base de l'API est configurée dans le fichier `api.ts` via la variable d'environnement `VITE_APP_API_URL`.

### Mappage des données
La fonction `mapApiDataToUser` convertit les données reçues de l'API au format `User` utilisé par l'application :

```typescript
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
  image: apiData.image || null
});
```

### Fonctions CRUD implémentées

#### Récupération des vendeurs
```typescript
export const fetchSellers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/admin/sellers');

    if (!response.data || !response.data.sellers) {
      throw new Error('Format de réponse API inattendu');
    }

    return response.data.sellers.map(mapApiDataToUser);
  } catch (error) {
    console.error('Erreur lors de la récupération des vendeurs:', error);
    throw error;
  }
};
```

#### Récupération d'un vendeur spécifique
```typescript
export const fetchSellerById = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/admin/sellers/${id}`);

    if (!response.data || !response.data.seller) {
      throw new Error('Format de réponse API inattendu');
    }

    return mapApiDataToUser(response.data.seller);
  } catch (error) {
    console.error(`Erreur lors de la récupération du vendeur ${id}:`, error);
    throw error;
  }
};
```

#### Ajout d'un vendeur
La fonction `addSeller` gère à la fois les données JSON standard et les fichiers (images) via FormData :

```typescript
export const addSeller = async (seller: Omit<User, 'id'>): Promise<User> => {
  try {
    // Préparation des données
    const sellerData = { /* ... */ };

    let response;
    // Utilisation de FormData si l'image est un objet File/Blob
    if (typeof seller.image === 'object' && seller.image !== null) {
      const formData = new FormData();
      // Ajout des champs au FormData
      // ...
      response = await api.post('/admin/sellers', formData);
    } else {
      // Envoi JSON standard
      response = await api.post('/admin/sellers', sellerData);
    }

    // Vérification et traitement de la réponse
    // ...

    return mapApiDataToUser(response.data.seller);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du vendeur:', error);
    throw error;
  }
};
```

#### Mise à jour d'un vendeur
Similaire à `addSeller`, mais utilise `PUT` au lieu de `POST`.

#### Suppression d'un vendeur
```typescript
export const deleteSeller = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/admin/sellers/${id}`);

    if (!response.data || response.data.status !== 'success') {
      throw new Error('Échec de la suppression du vendeur');
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du vendeur ${id}:`, error);
    throw error;
  }
};
```

#### Suppression multiple de vendeurs
```typescript
export const deleteMultipleSellers = async (ids: number[]): Promise<void> => {
  try {
    const response = await api.post('/admin/sellers/delete-multiple', { ids });

    if (!response.data || response.data.status !== 'success') {
      throw new Error('Échec de la suppression multiple des vendeurs');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression multiple de vendeurs:', error);
    throw error;
  }
};
```

## Composants React

### AddSeller
Le composant `AddSeller` permet d'ajouter un nouveau vendeur via un formulaire modal.

#### Fonctionnalités clés
- Validation des champs obligatoires
- Téléchargement et prévisualisation d'image
- Gestion des erreurs de formulaire
- Intégration avec Redux pour l'ajout de vendeur

#### Gestion des images
```typescript
// État pour l'image du vendeur
const [image, setImage] = React.useState<File | null>(null);

// Gestion du téléchargement d'image
const handleImageChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setImage(e.target.files[0]);
    // ...
  }
}, [errors]);

// Prévisualisation de l'image
{image && (
  <div className="image-preview">
    <img
      src={URL.createObjectURL(image)}
      alt="Aperçu"
      style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
    />
  </div>
)}
```

### EditSeller
Le composant `EditSeller` permet de modifier un vendeur existant.

#### Fonctionnalités clés
- Pré-remplissage du formulaire avec les données du vendeur
- Modification et prévisualisation d'image
- Affichage de l'image actuelle
- Intégration avec Redux pour la mise à jour

#### Gestion des images existantes et nouvelles
```typescript
// États pour les images
const [image, setImage] = React.useState<File | null>(null);
const [currentImageUrl, setCurrentImageUrl] = React.useState<string | null>(null);

// Chargement de l'image actuelle
React.useEffect(() => {
  if (current) {
    // ...
    if (current.image) {
      setCurrentImageUrl(current.image);
    }
  }
}, [current]);

// Affichage de l'image actuelle si aucune nouvelle image n'est sélectionnée
{!image && currentImageUrl && (
  <div className="current-image">
    <p>Image actuelle :</p>
    <img
      src={currentImageUrl}
      alt="Photo actuelle"
      style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
    />
  </div>
)}
```

### DeleteSeller
Le composant `DeleteSeller` gère la suppression d'un ou plusieurs vendeurs.

#### Fonctionnalités clés
- Confirmation avant suppression
- Suppression multiple
- Affichage des messages de succès/erreur
- Intégration avec Redux pour la suppression

### SellerRow
Le composant `SellerRow` affiche une ligne dans la liste des vendeurs avec des boutons d'action.

#### Fonctionnalités clés
- Affichage des informations du vendeur
- Boutons pour éditer et supprimer
- Gestion de l'état de suppression (chargement, erreur)
- Intégration avec le contexte pour l'édition

## Gestion des images

L'intégration optimise le traitement des images en utilisant des blobs au lieu de chaînes.

### Modifications de types pour la gestion des images
Pour permettre l'utilisation d'objets File/Blob pour les images, plusieurs modifications ont été apportées :

1. **Modification du type User** :
```typescript
// Avant
image: string | null;

// Après
image: string | null | File | Blob;
```

2. **Création d'un type spécifique pour l'ajout de vendeur** :
```typescript
// Dans backofficeSlice.ts
type SellerInput = Omit<User, 'id'>;

export const addSeller = createAsyncThunk(
  "backoffice/addSeller",
  async (seller: SellerInput, { dispatch }) => {
    // ...
  }
);
```

3. **Utilisation de type assertion dans les composants** :
```typescript
// Dans AddSeller.tsx
await dispatch(addSeller(sellerData as any)).unwrap();
```

Ces modifications permettent de gérer à la fois les URLs d'images (string) et les fichiers téléchargés (File/Blob) tout en maintenant la compatibilité avec l'API Redux.

### Téléchargement d'images
- Utilisation de l'élément `<input type="file">` pour sélectionner des images
- Stockage de l'image dans un état React (`File | null`)
- Prévisualisation via `URL.createObjectURL()`

### Envoi d'images au serveur
- Détection automatique du type d'image (objet File/Blob vs URL/chaîne)
- Utilisation de `FormData` pour les objets File/Blob
- Envoi direct pour les URLs/chaînes

### Affichage des images
- Prévisualisation des nouvelles images sélectionnées
- Affichage des images existantes depuis l'URL stockée

## Gestion des erreurs

L'intégration inclut une gestion robuste des erreurs à plusieurs niveaux.

### Niveau service API
- Try/catch autour des appels API
- Vérification de la structure de la réponse
- Journalisation des erreurs dans la console
- Propagation des erreurs pour traitement au niveau supérieur

### Niveau Redux
- Utilisation de `createAsyncThunk` pour gérer les états de chargement/erreur
- Propagation des erreurs aux composants

### Niveau composant
- Affichage des messages d'erreur
- Gestion des états de chargement
- Validation des formulaires

## Tests et validation

### Tests manuels
- Vérification de toutes les opérations CRUD
- Tests avec différents types d'images
- Tests de gestion des erreurs

### Points de validation
- Chargement correct de la liste des vendeurs
- Ajout de nouveaux vendeurs avec/sans image
- Mise à jour des vendeurs existants
- Suppression individuelle et multiple
- Affichage correct des messages d'erreur

## Annexes

### Structure des données
Le type `User` utilisé pour représenter un vendeur :

```typescript
export type User = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  adress: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  phone_number: string;
  image: string | null | File | Blob; // Supporte à la fois les URLs (string) et les fichiers (File/Blob)
  validated_at: string | null;
  type: "ADMIN" | "CUSTOMER" | "SELLER" | "PROFESSIONNAL";
};
```

### Dépendances
- Redux Toolkit pour la gestion de l'état
- Axios pour les requêtes HTTP
- React Bootstrap pour les composants UI
- React Hooks pour la gestion de l'état local

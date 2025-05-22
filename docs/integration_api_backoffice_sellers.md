# Guide d'intégration de l'API Backoffice - Gestion des Vendeurs

Ce document détaille les étapes nécessaires pour passer de l'API simulée (JSONPlaceholder) à votre API réelle pour la gestion des vendeurs dans l'application Backoffice.

## 1. Configuration de la connexion à l'API

Dans le fichier `src/utilities/services/sellerService.ts`, modifiez simplement la constante API_BASE_URL:

```typescript
// Remplacer ceci:
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Par l'URL de votre API:
const API_BASE_URL = 'https://votre-api.com/api/v1';
```

Si votre API utilise le même système d'authentification que le reste de l'application, aucune modification supplémentaire n'est nécessaire pour l'authentification.

## 2. Adaptation des fonctions de service

Chaque fonction dans `sellerService.ts` contient des commentaires indiquant comment l'adapter à votre API réelle. Pour chaque fonction:

1. Commentez ou supprimez la section utilisant `fetch` (version JSONPlaceholder)
2. Décommentez la section marquée `/* UTILISATION FUTURE AVEC VOTRE API */`
3. Ajustez les endpoints et le format des données selon votre API

Exemple pour `fetchSellers()`:

```typescript
export const fetchSellers = async (): Promise<User[]> => {
  try {
    // Commentez ou supprimez ce bloc
    /*
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.map(mapApiDataToUser);
    */
    
    // Décommentez et adaptez ce bloc
    const response = await api.get('/sellers'); // Ajustez l'endpoint selon votre API
    return response.data.sellers; // Ajustez selon la structure de réponse de votre API
  } catch (error) {
    console.error('Erreur lors de la récupération des vendeurs:', error);
    throw error;
  }
};
```

## 3. Adaptation du mappage des données

Si la structure des données retournée par votre API est différente, vous devrez ajuster la fonction `mapApiDataToUser`:

```typescript
const mapApiDataToUser = (apiData: any): User => ({
  // Adaptez ce mappage selon la structure de votre API
  id: apiData.id,
  name: apiData.name, // ou apiData.nom selon votre API
  firstname: apiData.firstname, // ou apiData.prenom
  email: apiData.email,
  phone_number: apiData.phone_number, // ou apiData.telephone
  validated_at: apiData.validated_at,
  adress: apiData.adress, // ou apiData.adresse
  type: 'SELLER',
  created_at: apiData.created_at,
  updated_at: apiData.updated_at,
  email_verified_at: apiData.email_verified_at,
  image: apiData.image
});
```

Si votre API retourne déjà les données dans le même format que le type `User` utilisé par l'application, vous pouvez simplifier cette fonction ou la supprimer complètement.

## 4. Gestion des erreurs

Assurez-vous que votre API retourne des codes d'erreur HTTP appropriés (400, 404, 500, etc.) pour que les gestionnaires d'erreurs actuels fonctionnent correctement.

Si votre API utilise une structure d'erreur spécifique, vous devrez adapter les blocs `catch` pour extraire et afficher les messages d'erreur appropriés.

## 5. Pagination et filtrage (optionnel)

Si votre API prend en charge la pagination ou le filtrage, vous pouvez étendre les fonctions pour accepter des paramètres supplémentaires:

```typescript
export const fetchSellers = async (page = 1, limit = 10, filters = {}): Promise<{ sellers: User[], total: number }> => {
  try {
    const response = await api.get('/sellers', { 
      params: { page, limit, ...filters } 
    });
    return {
      sellers: response.data.sellers,
      total: response.data.total
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des vendeurs:', error);
    throw error;
  }
};
```

## 6. Tests d'intégration

Après avoir effectué ces modifications, testez chaque fonctionnalité CRUD pour vous assurer que:

1. La liste des vendeurs se charge correctement
2. L'ajout de nouveaux vendeurs fonctionne
3. La modification des vendeurs existants fonctionne
4. La suppression (individuelle et multiple) fonctionne
5. Les erreurs sont correctement gérées et affichées à l'utilisateur

## Remarques importantes

- Le code a été conçu pour minimiser les changements nécessaires lors de l'intégration de votre API
- La structure suit les mêmes normes et architecture que le reste de l'application
- Les composants React n'auront pas besoin d'être modifiés si les interfaces des fonctions d'API restent les mêmes

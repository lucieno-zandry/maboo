# Architecture Produits/Variantes

## Objectifs
- Permettre des variantes dynamiques multi-attributs (ex: material, color, inner_design).
- Faire varier prix et stock selon la variante sélectionnée.
- Supprimer Redux sur la page produit et simplifier les flux.
- S’aligner sur l’API de liste produits fournie par le backend.

## Flux Front (Détail Produit)
- Page: `src/App/Frontoffice/Product/Product.tsx`
  - Charge le produit par `slug` via l’API existante.
  - Fallback mock si `VITE_USE_MOCKS='true'` (utilise `getProductsMock` pour tester sans backend).
  - Passe `product` en props à `LeftSide` et `RightSide`.

- Affichage et interaction: `src/App/Frontoffice/Product/RightSide/RightSide.tsx`
  - Sélection initiale: première variante disponible par défaut.
  - Prix affiché: `variant.special_price` sinon `variant.price`; fallback `product.sale_price` sinon `product.price`.
  - Stock affiché: `variant.stock` sinon `variant.inStock`; fallback `product.inStock`.
  - Attributs: affichés sous le prix pour la variante courante; si des `attributes` existent, le sélecteur `VariantSelector` est utilisé.
  - Ajout panier: envoie `product_id`, `quantity`, `product_variant_id`, et éventuellement `product_color_id` (si pas d’`attributes`).

- Sélecteur d’attributs: `src/App/Frontoffice/Product/RightSide/VariantSelector/VariantSelector.tsx`
  - Déduit dynamiquement les dimensions depuis `variant.attributes`.
  - Construit des listes d’options par dimension.
  - Résout la variante correspondant à la combinaison sélectionnée.
  - Fallback: `ProductVariants` (miniatures) si aucune `attributes` n’est fournie.

## Types et Normalisation
- Types produit: `src/utilities/constants/types.ts`
  - `ProductVariant` étendu avec `sku`, `special_price`, `stock`, `attributes`.

- Normaliseur API liste: `normalizeProducts` dans `src/utilities/api/actions.tsx`
  - Convertit la structure `{ products: [{ variants: { id, sku, price, special_price, stock, image } }] }` vers nos types front.
  - Remplit les champs dérivés (`name`, `inStock`) pour compatibilité.

## Mocks et Démo
- Mocks: `src/utilities/constants/fakes.tsx`
  - `mockProducts`: exemples de produits avec variantes multi-attributs.
  - Activables via `VITE_USE_MOCKS='true'`.

- Démo listing: `src/App/Frontoffice/VariantsDemo/VariantsDemo.tsx`
  - La route `/variants-demo` a été retirée; utiliser la page détail produit.
  - Affiche produits + variantes (sku, prix, stock, attributes) pour valider l’intégration.

## Backoffice Variantes
- Ajout variante: `src/App/Backoffice/.../ProductVariant/AddVariant/AddVariant.tsx`
  - Champs: image, nom, prix, prix promo, stock, SKU, attributs libres (clé/valeur).
  - Validations: `attributes` doivent être valides (clé/valeur conjointes ou ligne vide).
  - Envoi: `attributes` sérialisés JSON, `toFormData`, puis API.

- Liste variantes: `src/App/Backoffice/.../ProductVariant/VariantsList/*`
  - Colonnes: image, nom, prix, prix promo, SKU, stock, attributs, actions.
  - Édition: `Edit` supporte prix, stock, prix promo, SKU avec validations.

## API Client
- `src/utilities/api/actions.tsx`
  - `getProducts`: consomme `/products`.
  - `getProductsMock`: renvoie `mockProducts`.
  - `normalizeProducts`: convertit les données backend vers nos types.
  - Détail produit: conserve l’endpoint existant `getProduct(slug)`.

## Synchronisation Backend/Frontend
### Attentes Backend
- Endpoint liste: `GET /products` avec structure conforme à l’exemple partagé.
  - Chaque `variant` doit inclure: `id`, `sku`, `price`, `special_price` (nullable), `stock`, `image` (nullable), `attributes` (objet libre optionnel).
- Endpoint détail: conserver `GET /product/get/:slug` pour la page produit.
- Attributs libres: renvoyer un objet `{ [dimension]: valeur }` (ex: `{ material: 'Cuir', color: 'Noir', inner_design: 'Classic' }`).

### Travail Front restant (si nécessaire)
- Intégrer la liste produits par catégories (Bébé/Maman) avec `getProducts` + filtrage `category_id`.
- Ajouter validations supplémentaires backoffice (longueur maximale, jeu de caractères autorisés) selon les règles métiers.
- Améliorer l’UX du sélecteur d’attributs (labels, ordre des dimensions) si le backend propose des métadonnées.

## Utilisation en Dev
- Activer mocks: définir `VITE_USE_MOCKS='true'`.
- Tester:
  - Détail: `/product/<slug>` (ex: `/product/odio-harum-nisi-beatae-sapiente`).
  - Démo supprimée; voir `/product/:slug` pour l’implémentation réelle.

## Notes
- Si `attributes` existent, le sélecteur par dimensions est utilisé et `ColorSelector` est masqué.
- Si `attributes` n’existent pas, on retombe sur le sélecteur par miniatures (`ProductVariants`).

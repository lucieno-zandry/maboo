Objectif
- Variantes dynamiques multi-attributs, prix/stock par sélection
- Suppression de Redux dans la page produit
- Alignement avec l’API liste produits

Front
- Product: chargement via API locale, mock activable par VITE_USE_MOCKS
- VariantSelector: sélection par attributes libres et résolution de variante
- RightSide: prix dynamique (special_price > price), stock de variante, affichage des attributes sélectionnés
- ProductVariants: fallback quand aucune attributes n’est fournie
- Route: /variants-demo pour afficher liste et variantes

Types
- ProductVariant étendu: sku, special_price, stock, attributes

Backoffice
- AddVariant: champs SKU, prix promo, éditeur d’attributs, validations
- VariantsList/Item: affichage sku, prix promo, stock, attributes
- EditVariant: édition prix, stock, prix promo, SKU

API Client
- getProducts, normalizeProducts, getProductsMock

Intégration Backend
- Variantes: fournir attributes libres côté API par variante
- Prix: utiliser special_price si présent
- Stock: stock par variante
- Endpoint détail: conserver GET product/:slug

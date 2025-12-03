# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Frontoffice Produits — Notes d’implémentation

- Liste `/products` consomme `Products` (backend) via `getProducts` avec fallback mock interne si l’API échoue.
- Détail `/product/:slug` consomme `ProductDetail` (backend) via `getProduct` avec fallback mock interne; la page mappe vers le modèle UI.
- Sélection des variantes basée sur `variant_groups` et `variant_options` en attribuant des `attributes` par groupe aux variantes; options indisponibles affichées en gris.
- Libellé prix homogénéisé en `Ar`.
- Sections Marchand et Catégorie masquées temporairement sur la page détail en attente du backend.

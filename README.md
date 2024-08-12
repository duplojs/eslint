# @duplojs/eslint
Règle par défaut de tous les projets `duplojs`.

### Instalation
```
npm i @duplojs/eslint --save-dev
```

### Utilisation
Dans un fichier `eslint.config.js`.
```ts
import duploLint from "@duplojs/eslint";

export default [
  {
    ...yourBullShitRules,
  },
  duploLint,
];
```
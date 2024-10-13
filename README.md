# @duplojs/eslint
Default eslint rules for `duplojs`.

### Installation
```
npm i @duplojs/eslint --save-dev
```

### Usage
In file `eslint.config.js` :
```ts
import duploLint from "@duplojs/eslint";

export default [
  {
    ...yourBullShitRules,
  },
  {
    ...duploLint,
    files: ["**/*.{ts,js}"],
  },
];

```
# @duplojs/eslint
[![NPM version](https://img.shields.io/npm/v/@duplojs/eslint)](https://www.npmjs.com/package/@duplojs/eslint)

Default eslint rules for `duplojs`.

### Installation
```
npm i @duplojs/eslint --save-dev
```

### Usage
In file `eslint.config.js` :
```ts
import { duplojsEslintBase, duplojsEslintTest } from "@duplojs/eslint";

export default [
    {
        ...duplojsEslintTest,
        files: ["**/*.test.{ts,js}"],
    },
    {
        ...duplojsEslintBase,
        files: ["**/*.{ts,js}"],
		ignores: ["**/*.test.{ts,js}"],
    },
];
```

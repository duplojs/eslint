import duploLint from "./dist/index.mjs";

export default [
  {
    ...duploLint,
    files: ["**/*.ts"],
  },
];
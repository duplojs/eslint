import { type Linter } from "eslint";
import { defaultConfig } from "./default";

export const testConfig = {
	...defaultConfig,
	rules: {
		...defaultConfig.rules,
		"no-eval": "off",
		"no-bitwise": "off",
		"new-cap": "off",
		"func-style": "off",
		"max-classes-per-file": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
		"@typescript-eslint/await-thenable": "off",
		"@typescript-eslint/no-empty-object-type": "off",
		"@typescript-eslint/no-magic-numbers": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-unnecessary-type-parameters": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-declaration-merging": "off",
		"@typescript-eslint/no-unsafe-enum-comparison": "off",
		"@typescript-eslint/no-unsafe-function-type": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-unsafe-unary-minus": "off",
		"no-useless-assignment": "off",
	},
} as const satisfies Linter.Config;

export const testConfigService = {
	...testConfig,
	languageOptions: {
		...testConfig.languageOptions,
		parserOptions: {
			...testConfig.languageOptions.parserOptions,
			projectService: true,
		},
	},
} as const satisfies Linter.Config;

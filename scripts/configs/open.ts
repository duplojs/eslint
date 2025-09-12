import { defaultConfig } from "./default";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export const openConfig = {
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
		"@typescript-eslint/no-magic-numbers": "off",
		"@typescript-eslint/no-use-before-define": "off",
	},
} as const satisfies FlatConfig.Config;

export const openConfigService = {
	...openConfig,
	languageOptions: {
		...openConfig.languageOptions,
		parserOptions: {
			...openConfig.languageOptions.parserOptions,
			projectService: true,
		},
	},
} as const satisfies FlatConfig.Config;

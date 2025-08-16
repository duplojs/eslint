import { base } from "./base";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export const open = {
	...base,
	rules: {
		...base.rules,
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

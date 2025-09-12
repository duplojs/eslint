import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { wrapParensExpression } from "./wrap-parens-expression/index";

export const plugin = {
	rules: {
		"wrap-parens-expression": wrapParensExpression,
		// "wrap-function-argument": wrapFunctionArgument,
	},
} satisfies FlatConfig.Plugin;

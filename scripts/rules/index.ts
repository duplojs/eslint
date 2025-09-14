import { type ESLint } from "eslint";
import { wrapManyFunctionArgument } from "./wrap-many-function-argument";
import { unwrapSingleFunctionArgument } from "./unwrap-single-function-argument";
import { wrapSingleFunctionArgumentWithManyGeneric } from "./wrap-single-function-argument-with-many-generic";
import { wrapGeneric } from "./wrap-generic";
import { prefixGeneric } from "./prefix-generic";

export const plugin = {
	rules: {
		"wrap-many-function-argument": wrapManyFunctionArgument,
		"unwrap-single-function-argument": unwrapSingleFunctionArgument,
		"wrap-single-function-argument-with-many-generic": wrapSingleFunctionArgumentWithManyGeneric,
		"wrap-generic": wrapGeneric,
		"prefix-generic": prefixGeneric,
	},
} satisfies ESLint.Plugin;

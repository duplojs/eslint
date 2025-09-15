import { type ESLint } from "eslint";
import { wrapManyFunctionArgument } from "./wrap-many-function-argument";
import { unwrapSingleFunctionArgument } from "./unwrap-single-function-argument";
import { wrapSingleFunctionArgumentWithManyGeneric } from "./wrap-single-function-argument-with-many-generic";
import { wrapGeneric } from "./wrap-generic";
import { prefixGeneric } from "./prefix-generic";
import { indentIntersection } from "./indent-intersection";
import { indentUnion } from "./indent-union";
import { wrapParensIntersection } from "./wrap-parens-intersection";

export const plugin = {
	rules: {
		"wrap-many-function-argument": wrapManyFunctionArgument,
		"unwrap-single-function-argument": unwrapSingleFunctionArgument,
		"wrap-single-function-argument-with-many-generic": wrapSingleFunctionArgumentWithManyGeneric,
		"wrap-generic": wrapGeneric,
		"prefix-generic": prefixGeneric,
		"indent-intersection": indentIntersection,
		"indent-union": indentUnion,
		"wrap-parens-intersection": wrapParensIntersection,
	},
} satisfies ESLint.Plugin;

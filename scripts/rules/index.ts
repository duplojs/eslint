import { type ESLint } from "eslint";
import { wrapManyFunctionArgument } from "./wrap-many-function-argument";
import { unwrapSingleFunctionArgument } from "./unwrap-single-function-argument";
import { wrapSingleFunctionArgumentWithManyGeneric } from "./wrap-single-function-argument-with-many-generic";
import { wrapGeneric } from "./wrap-generic";
import { prefixGeneric } from "./prefix-generic";
import { indentUnion } from "./indent-union";
import { indentIntersection } from "./indent-intersection";
import { wrapIntersection } from "./wrap-intersection";
import { wrapParensIntersection } from "./wrap-parens-intersection";

export const plugin = {
	rules: {
		"wrap-many-function-argument": wrapManyFunctionArgument,
		"unwrap-single-function-argument": unwrapSingleFunctionArgument,
		"wrap-single-function-argument-with-many-generic": wrapSingleFunctionArgumentWithManyGeneric,
		"wrap-generic": wrapGeneric,
		"prefix-generic": prefixGeneric,
		"indent-union": indentUnion,
		"indent-intersection": indentIntersection,
		"wrap-intersection": wrapIntersection,
		"wrap-parens-intersection": wrapParensIntersection,
	},
} satisfies ESLint.Plugin;

type Test = (
	string
	& number
);

interface tt<
	GenericT extends string
		& number,
> {}

{
	function fn<
		GenericT extends(
			string
			& number
			& bigint
		),
	>() {

	}
}

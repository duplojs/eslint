import { type ESLint } from "eslint";
import {wrapManyFunctionArgument} from "./wrap-many-function-argument";
import {unwrapSingleFunctionArgument} from "./unwrap-single-function-argument";
import {wrapSingleFunctionArgumentWithManyGeneric} from "./wrap-single-function-argument-with-many-generic";

export const plugin = {
    rules: {
        "wrap-many-function-argument": wrapManyFunctionArgument,
        "unwrap-single-function-argument": unwrapSingleFunctionArgument,
        "wrap-single-function-argument-with-many-generic": wrapSingleFunctionArgumentWithManyGeneric,
    },
} satisfies ESLint.Plugin;

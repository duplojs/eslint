import { type ESLint } from "eslint";
import {wrapManyFunctionArgument} from "./wrap-many-function-argument";

export const plugin = {
    rules: {
        "wrap-many-function-argument": wrapManyFunctionArgument,
    },
} satisfies ESLint.Plugin;

import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import unusedImports from "eslint-plugin-unused-imports";
import { plugin } from "../rules";
import parserTs from "@typescript-eslint/parser";
import { type Linter } from "eslint";

export const formattingConfig = {
	plugins: {
		"@stylistic/js": stylisticJs,
		"@stylistic/ts": stylisticTs,
		"unused-imports": unusedImports,
		"@duplojs": plugin,
	},
	languageOptions: {
		parser: parserTs,
		parserOptions: {
			project: true,
		},
	},
	rules: {
		"@stylistic/js/array-bracket-newline": ["error", { multiline: true }],
		"@stylistic/js/array-bracket-spacing": ["error", "never"],
		"@stylistic/js/array-element-newline": [
			"error",
			{
				consistent: true,
				multiline: true,
			},
		],
		"@stylistic/js/arrow-parens": ["error", "always"],
		"@stylistic/js/arrow-spacing": "error",
		"@stylistic/js/block-spacing": "error",
		"@stylistic/js/brace-style": "error",
		"@stylistic/js/comma-dangle": ["error", "always-multiline"],
		"@stylistic/js/comma-spacing": [
			"error",
			{
				before: false,
				after: true,
			},
		],
		"@stylistic/js/comma-style": ["error", "last"],
		"@stylistic/js/computed-property-spacing": ["error", "never"],
		"@stylistic/js/dot-location": ["error", "property"],
		"@stylistic/js/eol-last": ["error", "always"],
		"@stylistic/js/function-call-spacing": ["error", "never"],
		"@stylistic/js/function-call-argument-newline": ["error", "always"],
		"@stylistic/js/function-paren-newline": ["error", "multiline-arguments"],
		"@stylistic/js/generator-star-spacing": [
			"error",
			{
				before: true,
				after: false,
			},
		],
		"@stylistic/js/implicit-arrow-linebreak": ["error", "beside"],
		"@stylistic/js/indent": "off",
		"@stylistic/js/jsx-quotes": ["error", "prefer-double"],
		"@stylistic/js/key-spacing": [
			"error",
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		"@stylistic/js/keyword-spacing": ["error", { before: true }],
		"@stylistic/js/line-comment-position": ["error", { position: "above" }],
		"@stylistic/js/linebreak-style": ["error", "unix"],
		"@stylistic/js/lines-around-comment": ["error", { beforeBlockComment: true }],
		"@stylistic/js/lines-between-class-members": ["error", "always"],
		"@stylistic/js/max-len": [
			"error",
			{
				code: 120,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		"@stylistic/js/max-statements-per-line": ["error", { max: 1 }],
		"@stylistic/js/multiline-comment-style": "off",
		"@stylistic/js/multiline-ternary": ["error", "always-multiline"],
		"@stylistic/js/new-parens": "error",
		"@stylistic/js/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
		"@stylistic/js/no-confusing-arrow": "off",
		"@stylistic/js/no-extra-parens": "off",
		"@stylistic/js/no-extra-semi": "error",
		"@stylistic/js/no-floating-decimal": "error",
		"@stylistic/js/no-mixed-operators": "error",
		"@stylistic/js/no-mixed-spaces-and-tabs": "error",
		"@stylistic/js/no-multi-spaces": "error",
		"@stylistic/js/no-multiple-empty-lines": [
			"error",
			{
				max: 1,
				maxEOF: 1,
			},
		],
		"@stylistic/js/no-tabs": ["error", { allowIndentationTabs: true }],
		"@stylistic/js/no-trailing-spaces": "error",
		"@stylistic/js/no-whitespace-before-property": "error",
		"@stylistic/js/nonblock-statement-body-position": ["error", "beside"],
		"@stylistic/js/object-curly-newline": [
			"error",
			{
				consistent: true,
				multiline: true,
			},
		],
		"@stylistic/js/object-curly-spacing": ["error", "always"],
		"@stylistic/js/object-property-newline": "error",
		"@stylistic/js/one-var-declaration-per-line": ["error", "always"],
		"@stylistic/js/operator-linebreak": ["error", "before"],
		"@stylistic/js/padded-blocks": ["error", "never"],
		"@stylistic/js/padding-line-between-statements": "off",
		"@stylistic/js/quote-props": ["error", "as-needed"],
		"@stylistic/js/quotes": ["error", "double"],
		"@stylistic/js/rest-spread-spacing": ["error", "never"],
		"@stylistic/js/semi": ["error", "always"],
		"@stylistic/js/semi-spacing": "error",
		"@stylistic/js/semi-style": ["error", "last"],
		"@stylistic/js/space-before-blocks": "error",
		"@stylistic/js/space-before-function-paren": ["error", "never"],
		"@stylistic/js/space-in-parens": ["error", "never"],
		"@stylistic/js/space-infix-ops": "error",
		"@stylistic/js/space-unary-ops": "error",
		"@stylistic/js/spaced-comment": "off",
		"@stylistic/js/switch-colon-spacing": "error",
		"@stylistic/js/template-curly-spacing": "error",
		"@stylistic/js/template-tag-spacing": "error",
		"@stylistic/js/wrap-iife": ["error", "inside"],
		"@stylistic/js/wrap-regex": "off",
		"@stylistic/js/yield-star-spacing": ["error", "before"],

		"@stylistic/ts/block-spacing": "error",
		"@stylistic/ts/brace-style": "error",
		"@stylistic/ts/comma-dangle": ["error", "always-multiline"],
		"@stylistic/ts/comma-spacing": [
			"error",
			{
				before: false,
				after: true,
			},
		],
		"@stylistic/ts/function-call-spacing": ["error", "never"],
		"@stylistic/ts/indent": ["error", "tab"],
		"@stylistic/ts/key-spacing": [
			"error",
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		"@stylistic/ts/keyword-spacing": ["error", { before: true }],
		"@stylistic/ts/lines-around-comment": ["error", { beforeBlockComment: true }],
		"@stylistic/ts/lines-between-class-members": ["error", "always", { exceptAfterOverload: true }],
		"@stylistic/ts/member-delimiter-style": "error",
		"@stylistic/ts/no-extra-parens": "off",
		"@stylistic/ts/no-extra-semi": "error",
		"@stylistic/ts/object-curly-newline": [
			"error",
			{
				consistent: true,
				multiline: true,
			},
		],
		"@stylistic/ts/object-curly-spacing": ["error", "always"],
		"@stylistic/ts/object-property-newline": "error",
		"@stylistic/ts/padding-line-between-statements": "off",
		"@stylistic/ts/quote-props": ["error", "as-needed"],
		"@stylistic/ts/quotes": ["error", "double"],
		"@stylistic/ts/semi": "error",
		"@stylistic/ts/space-before-blocks": "error",
		"@stylistic/ts/space-before-function-paren": ["error", "never"],
		"@stylistic/ts/space-infix-ops": "error",
		"@stylistic/ts/type-annotation-spacing": "error",

		"unused-imports/no-unused-imports": "error",

		"@duplojs/wrap-many-function-argument": "error",
		"@duplojs/unwrap-single-function-argument": "error",
		"@duplojs/wrap-single-function-argument-with-many-generic": "error",
		"@duplojs/wrap-generic": "error",
		"@duplojs/prefix-generic": "error",
		"@duplojs/indent-union": "error",
		"@duplojs/indent-intersection": "error",
		"@duplojs/wrap-intersection": "error",
		"@duplojs/wrap-parens-intersection": "error",
		"@duplojs/wrap-union": "error",
	},
} as const satisfies Linter.Config;

export const formattingConfigService = {
	...formattingConfig,
	languageOptions: {
		...formattingConfig.languageOptions,
		parserOptions: {
			...formattingConfig.languageOptions.parserOptions,
			projectService: true,
		},
	},
} as const satisfies Linter.Config;

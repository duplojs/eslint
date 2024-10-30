import parserTs from "@typescript-eslint/parser";
import tslint from "@typescript-eslint/eslint-plugin";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export const base = {
	plugins: {
		"@stylistic/js": stylisticJs,
		"@stylistic/ts": stylisticTs,
		"@typescript-eslint": tslint,
	},
	languageOptions: {
		parser: parserTs,
		parserOptions: {
			project: true,
		},
	},
	rules: {
		"array-callback-return": [
			"error",
			{
				checkForEach: true,
				allowVoid: true,
			},
		],
		"constructor-super": "error",
		"for-direction": "error",
		"getter-return": "error",
		"no-async-promise-executor": "error",
		"no-await-in-loop": "off",
		"no-class-assign": "error",
		"no-compare-neg-zero": "error",
		"no-cond-assign": "error",
		"no-const-assign": "error",
		"no-constant-binary-expression": "error",
		"no-constant-condition": "warn",
		"no-constructor-return": "error",
		"no-control-regex": "error",
		"no-debugger": "warn",
		"no-dupe-args": "error",
		"no-dupe-class-members": "off",
		"no-dupe-else-if": "error",
		"no-dupe-keys": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-empty-character-class": "error",
		"no-empty-pattern": "error",
		"no-ex-assign": "error",
		"no-fallthrough": "error",
		"no-func-assign": "error",
		"no-import-assign": "error",
		"no-inner-declarations": "error",
		"no-invalid-regexp": "error",
		"no-irregular-whitespace": "error",
		"no-loss-of-precision": "off",
		"no-misleading-character-class": "error",
		"no-new-native-nonconstructor": "error",
		"no-obj-calls": "error",
		"no-promise-executor-return": ["error", { allowVoid: true }],
		"no-prototype-builtins": "error",
		"no-self-assign": "error",
		"no-self-compare": "error",
		"no-setter-return": "error",
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "warn",
		"no-this-before-super": "error",
		"no-undef": "off",
		"no-unexpected-multiline": "error",
		"no-unmodified-loop-condition": "error",
		"no-unreachable": "warn",
		"no-unreachable-loop": "error",
		"no-unsafe-finally": "error",
		"no-unsafe-negation": "error",
		"no-unsafe-optional-chaining": "error",
		"no-unused-private-class-members": "warn",
		"no-unused-vars": "off",
		"no-use-before-define": "off",
		"no-useless-assignment": "off",
		"no-useless-backreference": "error",
		"require-atomic-updates": "off",
		"use-isnan": "error",
		"valid-typeof": "error",
		"accessor-pairs": "error",
		"arrow-body-style": ["error", "as-needed"],
		"block-scoped-var": "error",
		camelcase: "error",
		"capitalized-comments": "off",
		"class-methods-use-this": "off",
		complexity: "off",
		"consistent-return": "off",
		"consistent-this": "off",
		curly: "error",
		"default-case": "off",
		"default-case-last": "off",
		"default-param-last": "off",
		"dot-notation": "error",
		eqeqeq: ["error", "always"],
		"func-name-matching": "error",
		"func-names": "off",
		"func-style": ["error", "declaration"],
		"grouped-accessor-pairs": "error",
		"guard-for-in": "off",
		"id-denylist": "off",
		"id-length": "error",
		"id-match": "off",
		"init-declarations": "off",
		"logical-assignment-operators": ["error", "always"],
		"max-classes-per-file": "error",
		"max-depth": "off",
		"max-lines": "off",
		"max-lines-per-function": "off",
		"max-nested-callbacks": "off",
		"max-params": "off",
		"max-statements": "off",
		"new-cap": [
			"error",
			{
				newIsCap: true,
				capIsNew: true,
				properties: true,
			},
		],
		"no-alert": "off",
		"no-array-constructor": "off",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-case-declarations": "error",
		"no-console": "warn",
		"no-continue": "off",
		"no-delete-var": "error",
		"no-div-regex": "off",
		"no-else-return": "off",
		"no-empty": "warn",
		"no-empty-function": "off",
		"no-empty-static-block": "warn",
		"no-eq-null": "error",
		"no-eval": "error",
		"no-extend-native": "off",
		"no-extra-bind": "error",
		"no-extra-boolean-cast": "error",
		"no-extra-label": "error",
		"no-global-assign": "error",
		"no-implicit-coercion": [
			"error",
			{
				allow: ["!!"],
			},
		],
		"no-implicit-globals": "off",
		"no-implied-eval": "off",
		"no-inline-comments": "off",
		"no-invalid-this": "off",
		"no-iterator": "error",
		"no-label-var": "error",
		"no-labels": "off",
		"no-lone-blocks": "off",
		"no-lonely-if": "error",
		"no-loop-func": "off",
		"no-magic-numbers": "off",
		"no-multi-assign": "error",
		"no-multi-str": "error",
		"no-negated-condition": "off",
		"no-nested-ternary": "error",
		"no-new": "off",
		"no-new-func": "error",
		"no-new-wrappers": "error",
		"no-nonoctal-decimal-escape": "error",
		"no-object-constructor": "error",
		"no-octal": "error",
		"no-octal-escape": "error",
		"no-param-reassign": "error",
		"no-plusplus": "off",
		"no-proto": "error",
		"no-redeclare": "off",
		"no-regex-spaces": "error",
		"no-restricted-exports": "off",
		"no-restricted-globals": "off",
		"no-restricted-imports": "off",
		"no-restricted-properties": "off",
		"no-restricted-syntax": "off",
		"no-return-assign": "error",
		"no-return-await": "off",
		"no-sequences": "error",
		"no-shadow": "off",
		"no-shadow-restricted-names": "error",
		"no-ternary": "off",
		"no-throw-literal": "off",
		"no-undef-init": "off",
		"no-undefined": "off",
		"no-underscore-dangle": "off",
		"no-unneeded-ternary": "error",
		"no-unused-expressions": "off",
		"no-unused-labels": "error",
		"no-useless-call": "error",
		"no-useless-catch": "error",
		"no-useless-computed-key": "error",
		"no-useless-concat": "error",
		"no-useless-constructor": "off",
		"no-useless-escape": "error",
		"no-useless-rename": "error",
		"no-useless-return": "off",
		"no-var": "error",
		"no-void": "off",
		"no-warning-comments": "off",
		"no-with": "error",
		"object-shorthand": "off",
		"one-var": "off",
		"operator-assignment": "off",
		"prefer-arrow-callback": "error",
		"prefer-const": "error",
		"prefer-destructuring": "off",
		"prefer-exponentiation-operator": "off",
		"prefer-named-capture-group": "off",
		"prefer-numeric-literals": "off",
		"prefer-object-has-own": "off",
		"prefer-object-spread": "error",
		"prefer-promise-reject-errors": "off",
		"prefer-regex-literals": "error",
		"prefer-template": "error",
		radix: "off",
		"require-await": "off",
		"require-unicode-regexp": "off",
		"require-yield": "error",
		"sort-imports": "off",
		"sort-keys": "off",
		"sort-vars": "off",
		strict: "off",
		"symbol-description": "error",
		"vars-on-top": "off",
		yoda: "error",

		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": "error",
		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/ban-ts-comment": [
			"error",
			{
				"ts-expect-error": "allow-with-description",
			},
		],
		"@typescript-eslint/ban-tslint-comment": "error",
		"@typescript-eslint/class-literal-property-style": "error",
		"@typescript-eslint/class-methods-use-this": "off",
		"@typescript-eslint/consistent-generic-constructors": "error",
		"@typescript-eslint/consistent-indexed-object-style": "off",
		"@typescript-eslint/consistent-return": "off",
		"@typescript-eslint/consistent-type-assertions": "off",
		"@typescript-eslint/consistent-type-definitions": "error",
		"@typescript-eslint/consistent-type-exports": "off",
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				disallowTypeAnnotations: true,
				fixStyle: "inline-type-imports",
				prefer: "type-imports",
			},
		],
		"@typescript-eslint/default-param-last": "error",
		"@typescript-eslint/dot-notation": "error",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/init-declarations": ["error", "always"],
		"@typescript-eslint/max-params": [
			"error",
			{
				max: 4,
			},
		],
		"@typescript-eslint/member-ordering": "off",
		"@typescript-eslint/method-signature-style": ["error", "method"],
		"@typescript-eslint/naming-convention": "off",
		"@typescript-eslint/no-array-constructor": "error",
		"@typescript-eslint/no-array-delete": "error",
		"@typescript-eslint/no-base-to-string": "error",
		"@typescript-eslint/no-confusing-non-null-assertion": "error",
		"@typescript-eslint/no-confusing-void-expression": [
			"error",
			{
				ignoreVoidOperator: true,
			},
		],
		"@typescript-eslint/no-dupe-class-members": "error",
		"@typescript-eslint/no-duplicate-enum-values": "error",
		"@typescript-eslint/no-duplicate-type-constituents": "error",
		"@typescript-eslint/no-dynamic-delete": "error",
		"@typescript-eslint/no-empty-function": "warn",
		"@typescript-eslint/no-empty-object-type": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-extra-non-null-assertion": "error",
		"@typescript-eslint/no-extraneous-class": "off",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-implied-eval": "error",
		"@typescript-eslint/no-import-type-side-effects": "off",
		"@typescript-eslint/no-inferrable-types": "error",
		"@typescript-eslint/no-invalid-this": "error",
		"@typescript-eslint/no-invalid-void-type": "error",
		"@typescript-eslint/no-loop-func": "error",
		"@typescript-eslint/no-loss-of-precision": "error",
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignoreEnums: true,
				ignoreNumericLiteralTypes: true,
				ignoreReadonlyClassProperties: true,
				ignoreTypeIndexes: true,
			},
		],
		"@typescript-eslint/no-meaningless-void-operator": "off",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/no-mixed-enums": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-redeclare": "off",
		"@typescript-eslint/no-redundant-type-constituents": "error",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-restricted-imports": "off",
		"@typescript-eslint/no-restricted-types": "off",
		"@typescript-eslint/no-shadow": "off",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
		"@typescript-eslint/no-unnecessary-condition": "off",
		"@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unnecessary-template-expression": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "off",
		"@typescript-eslint/no-unnecessary-type-assertion": "off",
		"@typescript-eslint/no-unnecessary-type-constraint": "off",
		"@typescript-eslint/no-unnecessary-type-parameters": "off",
		"@typescript-eslint/no-unsafe-argument": "error",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-call": "error",
		"@typescript-eslint/no-unsafe-declaration-merging": "error",
		"@typescript-eslint/no-unsafe-enum-comparison": "error",
		"@typescript-eslint/no-unsafe-function-type": "error",
		"@typescript-eslint/no-unsafe-member-access": "error",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-unsafe-unary-minus": "error",
		"@typescript-eslint/no-unused-expressions": "error",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				ignoreRestSiblings: true,
				destructuredArrayIgnorePattern: "^_",
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"@typescript-eslint/no-use-before-define": "error",
		"@typescript-eslint/no-useless-constructor": "error",
		"@typescript-eslint/no-useless-empty-export": "error",
		"@typescript-eslint/no-wrapper-object-types": "error",
		"@typescript-eslint/non-nullable-type-assertion-style": "error",
		"@typescript-eslint/only-throw-error": "error",
		"@typescript-eslint/parameter-properties": "off",
		"@typescript-eslint/prefer-as-const": "error",
		"@typescript-eslint/prefer-destructuring": [
			"error",
			{
				array: true,
			},
		],
		"@typescript-eslint/prefer-enum-initializers": "error",
		"@typescript-eslint/prefer-find": "error",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-includes": "error",
		"@typescript-eslint/prefer-literal-enum-member": "error",
		"@typescript-eslint/prefer-namespace-keyword": "off",
		"@typescript-eslint/prefer-nullish-coalescing": "off",
		"@typescript-eslint/prefer-optional-chain": "error",
		"@typescript-eslint/prefer-promise-reject-errors": "error",
		"@typescript-eslint/prefer-readonly": "off",
		"@typescript-eslint/prefer-readonly-parameter-types": "off",
		"@typescript-eslint/prefer-reduce-type-parameter": "off",
		"@typescript-eslint/prefer-regexp-exec": "off",
		"@typescript-eslint/prefer-return-this-type": "error",
		"@typescript-eslint/prefer-string-starts-ends-with": "error",
		"@typescript-eslint/promise-function-async": "off",
		"@typescript-eslint/require-array-sort-compare": "error",
		"@typescript-eslint/require-await": "error",
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/restrict-template-expressions": "error",
		"@typescript-eslint/return-await": "error",
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/switch-exhaustiveness-check": "off",
		"@typescript-eslint/triple-slash-reference": "error",
		"@typescript-eslint/typedef": "off",
		"@typescript-eslint/unbound-method": "off",
		"@typescript-eslint/unified-signatures": "off",
		"@typescript-eslint/use-unknown-in-catch-callback-variable": "error",

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
		"@stylistic/js/function-call-argument-newline": ["error", "consistent"],
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
	},
} as const satisfies FlatConfig.Config;

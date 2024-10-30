import { Linter, type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { duplojsEslintBase, duplojsEslintOpen, duplojsEslintTest } from ".";
import { resolve } from "path";

describe("eslint rule", () => {
	it("all rules exist base", () => {
		const linter = new Linter();

		const tempConfigEslint: FlatConfig.Config = {
			...duplojsEslintBase,
			languageOptions: {
				...duplojsEslintBase.languageOptions,
				parserOptions: {
					project: "tsconfig.json",
					tsconfigRootDir: resolve(import.meta.dirname, ".."),
				},
			},
			files: ["scripts/**/*.ts"],
		};

		expect(() => linter.verify("\n", tempConfigEslint)).not.toThrowError();
	});

	it("all rules exist open", () => {
		const linter = new Linter();

		const tempConfigEslint: FlatConfig.Config = {
			...duplojsEslintOpen,
			languageOptions: {
				...duplojsEslintOpen.languageOptions,
				parserOptions: {
					project: "tsconfig.json",
					tsconfigRootDir: resolve(import.meta.dirname, ".."),
				},
			},
			files: ["scripts/**/*.ts"],
		};

		expect(() => linter.verify("\n", tempConfigEslint)).not.toThrowError();
	});

	it("all rules exist test", () => {
		const linter = new Linter();

		const tempConfigEslint: FlatConfig.Config = {
			...duplojsEslintTest,
			languageOptions: {
				...duplojsEslintTest.languageOptions,
				parserOptions: {
					project: "tsconfig.json",
					tsconfigRootDir: resolve(import.meta.dirname, ".."),
				},
			},
			files: ["scripts/**/*.ts"],
		};

		expect(() => linter.verify("\n", tempConfigEslint)).not.toThrowError();
	});
});

import { Linter, type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import configEslint from ".";
import { resolve } from "path";

describe("eslint rule", () => {
	const linter = new Linter();

	const tempConfigEslint: FlatConfig.Config = {
		...configEslint,
		languageOptions: {
			...configEslint.languageOptions,
			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: resolve(import.meta.dirname, ".."),
			},
		},
		files: ["scripts/**/*.ts"],
	};

	it("all rules exist", () => {
		expect(() => linter.verify("\n", tempConfigEslint)).not.toThrowError();
	});
});

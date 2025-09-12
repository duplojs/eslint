import { defineConfig, globalIgnores  } from "eslint/config";
import {duplojsEslintDefaultConfigService, duplojsEslintFormattingConfigService, duplojsEslintTestConfigService} from "./dist/index.mjs";

export default defineConfig([
	{
		...duplojsEslintDefaultConfigService,
		files: ["scripts/**/*.ts"]
	},
	{
		...duplojsEslintTestConfigService,
		files: ["tests/**/*.ts"]
	},
	{
		...duplojsEslintFormattingConfigService,
		files: ["scripts/**/*.ts", "tests/**/*.ts"]
	},
	globalIgnores(["tests/**/from.ts", "tests/**/to.ts"]),
]);
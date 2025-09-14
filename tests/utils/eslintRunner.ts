import { formattingConfigService } from "@scripts/configs/formatting";
import { ESLint, type Linter } from "eslint";


export async function formatWithProjectFormatting(code: string) {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: {
			...formattingConfigService,
			files: ["**/*.ts"],
		} as any,
		fix: true,
	});

	const [result] = await eslint.lintText(
		code,
		{ filePath: "tests/utils/fakeLintFile.ts" },
	);

	return {
		output: result?.output,
		message: result?.messages,
	};
}

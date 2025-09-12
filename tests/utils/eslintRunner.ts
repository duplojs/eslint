import { ESLint, type Linter } from "eslint";
// Use built output to ensure runtime plugin shape matches ESLint expectations
import { formattingConfig } from "@scripts/configs/formatting";

export interface FormatResult {
	output: string;
	messages: Linter.LintMessage[];
}

export async function formatWithProjectFormatting(
	initialCode: string,
	filePath: string,
): Promise<FormatResult> {
	const eslint = new ESLint({
		// Ensure our flat config applies to the test file
		overrideConfig: [
			{
				...formattingConfig,
				files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
			},
		],
		fix: true,
	});

	let code = initialCode;
	let lastOutput = initialCode;
	let messages: Linter.LintMessage[] = [];
	// Apply up to 3 passes to reach a stable formatted output
	for (let index = 0; index < 3; index += 1) {
		const [result] = await eslint.lintText(
			code,
			{ filePath },
		);
		lastOutput = result && typeof result.output === "string" ? result.output : code;
		messages = result?.messages ?? [];
		if (lastOutput === code) {
			break;
		}
		code = lastOutput;
	}
	return {
		output: lastOutput,
		messages,
	};
}

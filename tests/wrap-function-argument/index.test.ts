import { formatWithProjectFormatting } from "../utils/eslintRunner";
import { readFileSync } from "fs";
import { join } from "path";

describe(
	"wrap-function-argument",
	() => {
		const from = readFileSync(
			join(
				__dirname,
				"from.ts",
			),
			"utf8",
		);
		const to = readFileSync(
			join(
				__dirname,
				"to.ts",
			),
			"utf8",
		);

		it(
			"formatte correctement les fonctions selon la règle",
			async() => {
				const { output, messages } = await formatWithProjectFormatting(
					from,
					"from.ts",
				);
				expect(output.trim()).toBe(to.trim());
			},
		);
	},
);

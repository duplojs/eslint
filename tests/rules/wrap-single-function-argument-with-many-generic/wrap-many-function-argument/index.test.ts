import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
	"wrap-function-argument",
	async () => {
		const {
			fromCode,
			toCode
		} = await readEntries(import.meta.dirname)

		it(
			"formatte correctement les fonctions selon la règle",
			async() => {
				const { output, message } = await formatWithProjectFormatting(
					fromCode,
				);

				expect(message).toStrictEqual([]);

				expect(output).toBe(toCode);
			},
		);
	},
);
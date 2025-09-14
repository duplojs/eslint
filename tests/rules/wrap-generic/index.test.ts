import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
	"wrap-generic",
	async() => {
		const { fromCode, toCode } = await readEntries(import.meta.dirname);

		it(
			"formatte correctement les génériques selon la règle",
			async() => {
				const { output, message } = await formatWithProjectFormatting(fromCode);

				expect(message).toStrictEqual([]);

				expect(output).toBe(toCode);
			},
		);
	},
);

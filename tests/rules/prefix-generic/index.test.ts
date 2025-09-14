import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
	"prefix-generic",
	async () => {
		const { fromCode, toCode } = await readEntries(import.meta.dirname);

		it(
			"préfixe correctement les noms de génériques",
			async() => {
				const { output, message } = await formatWithProjectFormatting(fromCode);

				expect(message).toStrictEqual([]);

				expect(output).toBe(toCode);
			},
		);
	},
);


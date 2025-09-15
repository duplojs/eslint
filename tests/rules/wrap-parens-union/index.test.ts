import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
	"wrap-parens-union",
	async() => {
		const { fromCode, toCode } = await readEntries(import.meta.dirname);

		it.skip(
			"wrappe et formate correctement les unions parenthésées",
			async() => {
				const { output, message } = await formatWithProjectFormatting(fromCode);

				expect(message).toStrictEqual([]);

				expect(output).toBe(toCode);
			},
		);
	},
);


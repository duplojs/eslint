import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
	"wrap-intersection",
	async() => {
		const { fromCode, toCode } = await readEntries(import.meta.dirname);

		it.skip(
			"wrappe et formate correctement les intersections non parenthésées",
			async() => {
				const { output, message } = await formatWithProjectFormatting(fromCode);

				expect(message).toStrictEqual([]);

				expect(output).toBe(toCode);
			},
		);
	},
);


import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
    "wrap-parens-intersection",
    async () => {
        const { fromCode, toCode } = await readEntries(import.meta.dirname);

        it(
            "wrappe et formate correctement les intersections parenthésées",
            async () => {
                const { output, message } = await formatWithProjectFormatting(fromCode);

                expect(message).toStrictEqual([]);

                expect(output).toBe(toCode);
            },
        );
    },
);


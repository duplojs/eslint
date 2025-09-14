import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
    "indent-intersection",
    async () => {
        const { fromCode, toCode } = await readEntries(import.meta.dirname);

        it(
            "indente correctement les intersections quand elles sont wrap",
            async () => {
                const { output, message } = await formatWithProjectFormatting(fromCode);

                expect(message).toStrictEqual([]);

                expect(output).toBe(toCode);
            },
        );
    },
);


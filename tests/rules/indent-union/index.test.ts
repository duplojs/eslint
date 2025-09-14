import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";
import { readEntries } from "@tests/utils/readEntries";

describe(
    "indent-union",
    async () => {
        const { fromCode, toCode } = await readEntries(import.meta.dirname);

        it(
            "indente correctement les unions quand elles sont wrap",
            async () => {
                const { output, message } = await formatWithProjectFormatting(fromCode);

                expect(message).toStrictEqual([]);

                expect(output).toBe(toCode);
            },
        );
    },
);


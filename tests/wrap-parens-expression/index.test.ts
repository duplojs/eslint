import { describe, it, expect } from "vitest";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { formatWithProjectFormatting } from "@tests/utils/eslintRunner";

const fixtureDir = resolve(
	process.cwd(),
	"tests/wrap-parens-expression",
);
const fromPath = resolve(
	fixtureDir,
	"from.ts",
);
const toPath = resolve(
	fixtureDir,
	"to.ts",
);

describe(
	"formatting config — wrap-parens-expression end-to-end",
	async() => {
		const [fromCode, toCode] = await Promise.all([
			readFile(
				fromPath,
				"utf8",
			),
			readFile(
				toPath,
				"utf8",
			),
		]);

		it(
			"formats from.ts exactly into to.ts",
			async() => {
				const { output, messages } = await formatWithProjectFormatting(
					fromCode,
					fromPath,
				);
				expect(output).toBe(toCode);
			},
		);
	},
);

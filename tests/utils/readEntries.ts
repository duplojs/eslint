import { readFile } from "fs/promises";
import { resolve } from "path";

export async function readEntries(entryDir: string) {
	const fromPath = resolve(entryDir, "from.ts")
	const toPath = resolve(entryDir, "to.ts")

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

	return {
		fromCode,
		toCode
	}
}
import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

export const wrapUnion: Rule.RuleModule = {
	meta: {
		type: "layout",
		docs: {
			description: "Wrap union types so each '|' begins a new line.",
		},
		fixable: "code",
		schema: [],
		messages: {
			wrap: "Wrap union members with line breaks before '|'.",
		},
	},
	create(context) {
		const src = context.sourceCode;

		function handleUnion(node: Node
			& { types?: Node[] }) {
			const types = (node as any).types as Node[] | undefined;
			if (!types || types.length < 2) {
				return;
			}

			const firstType = types[0];
			const lastType = types[types.length - 1];

			const between = src.getTokensBetween(
				firstType as any,
				lastType as any,
			) as Token[];
			const amps = between.filter((t) => t.value === "|");
			if (amps.length === 0) {
				return;
			}

			// Determine if any '|' is not at start-of-line (ignoring indentation)
			let needsWrap = false;
			for (const amp of amps) {
				const beforeIdx = amp.range![0] - 1;
				const nlIdx = src.text.lastIndexOf(
					"\n",
					beforeIdx,
				);
				if (nlIdx === -1) {
					// No newline before this '|' -> not wrapped
					needsWrap = true;
					break;
				}
				const prefix = src.text.slice(
					nlIdx + 1,
					amp.range![0],
				);
				if (/[^\t \r]/u.test(prefix)) {
					// Non-whitespace before '|' on the same line -> not at line start
					needsWrap = true;
					break;
				}
			}

			if (!needsWrap) {
				return;
			}

			const start = (firstType as any).range[0] as number;
			const end = (lastType as any).range[1] as number;
			const current = src.text.slice(
				start,
				end,
			);

			// Reconstruct with newline before each subsequent member: "A\n| B\n| C"
			const pieces = types.map((t) => src.getText(t));
			const desired = [pieces[0], ...pieces.slice(1).map((p) => `\n| ${p}`)].join("");

			if (current === desired) {
				return;
			}

			// If the previous token is '=', also pull the first member up to that line.
			const prevTok = src.getTokenBefore(firstType as any) as Token | null;

			context.report({
				node: node as unknown as Node,
				messageId: "wrap",
				fix(fixer) {
					if (prevTok && prevTok.value === "=") {
						// Replace from just after '=' to the end of the union
						return fixer.replaceTextRange(
							[prevTok.range![1], end],
							` ${desired}`,
						);
					}
					return fixer.replaceTextRange(
						[start, end],
						desired,
					);
				},
			});
		}

		return {
			TSUnionType: handleUnion as any,
		};
	},
};

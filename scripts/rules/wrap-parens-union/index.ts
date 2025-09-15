import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getLineIndentFromToken(
	src: Rule.RuleContext["sourceCode"],
	tok: Token,
): string {
	const line = (tok.loc as any).start.line as number;
	const lineStart = src.getIndexFromLoc({
		line,
		column: 0,
	});
	const before = src.text.slice(
		lineStart,
		(tok as any).range[0],
	);
	const match = before.match(/^[\t ]*/u);
	return match ? match[0] : "";
}

export const wrapParensUnion: Rule.RuleModule = {
	meta: {
		type: "layout",
		docs: {
			description:
                "For parenthesized union types, wrap the members on separate lines with one '|' per line and place the closing parenthesis on its own line.",
		},
		fixable: "code",
		schema: [],
		messages: {
			wrap: "Wrap parenthesized union members across multiple lines.",
		},
	},
	create(context) {
		const src = context.sourceCode;

		function handleUnion(node: Node
			& Rule.NodeParentExtension
			& { types?: Node[] }) {
			const types: Node[] = ((node as any).types ?? []) as unknown as Node[];
			if (!Array.isArray(types) || types.length < 2) {
				return;
			}

			const firstType = types[0]!;
			const lastType = types[types.length - 1]!;

			const firstTok = src.getFirstToken(firstType as any) as Token | null;
			if (!firstTok) {
				return;
			}
			const prevTok = src.getTokenBefore(firstTok) as Token | null;
			if (!prevTok || prevTok.value !== "(") {
				return;
			} // only handle parenthesized unions
			const open = prevTok;
			// Find the matching ')' after the last type
			let close: Token | null = src.getTokenAfter(lastType as any) as Token | null;
			while (close && close.value !== ")") {
				close = src.getTokenAfter(close) as Token | null;
			}
			if (!close) {
				return;
			}

			const baseIndent = getLineIndentFromToken(
				src,
				open,
			);
			const innerIndent = `${baseIndent}\t`;

			const firstTokOfFirst = firstTok;
			const lastTokOfLast = src.getLastToken(lastType as any) as Token | null;
			if (!lastTokOfLast) {
				return;
			}

			// Determine current whitespace after '(' up to first type token
			const afterOpenRange: [number, number] = [open.range![1], firstTokOfFirst.range![0]];
			const currentAfterOpen = src.text.slice(
				afterOpenRange[0],
				afterOpenRange[1],
			);
			const desiredAfterOpen = `\n${innerIndent}`;

			// Determine current whitespace after last type token up to ')'
			const beforeCloseRange: [number, number] = [lastTokOfLast.range![1], close.range![0]];
			const currentBeforeClose = src.text.slice(
				beforeCloseRange[0],
				beforeCloseRange[1],
			);
			const desiredBeforeClose = `\n${baseIndent}`;

			const fixes: ((fixer: Rule.RuleFixer) => any)[] = [];

			if (currentAfterOpen !== desiredAfterOpen) {
				fixes.push((fixer) => fixer.replaceTextRange(
					afterOpenRange,
					desiredAfterOpen,
				));
			}
			if (currentBeforeClose !== desiredBeforeClose) {
				fixes.push((fixer) => fixer.replaceTextRange(
					beforeCloseRange,
					desiredBeforeClose,
				));
			}

			if (fixes.length === 0) {
				return;
			}

			context.report({
				node: node as unknown as Node,
				messageId: "wrap",
				fix(fixer) {
					return fixes.map((fn) => fn(fixer));
				},
			});
		}

		return {
			TSUnionType: handleUnion as any,
		};
	},
};

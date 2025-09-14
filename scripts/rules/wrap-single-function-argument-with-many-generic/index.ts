import { type Rule } from "eslint";
import { type FunctionDeclaration, type ArrowFunctionExpression, type Pattern, type Node } from "estree";

type Param = Pattern;

function countGenericTypeParams(
	param: Param,
	getText: (node: Node) => string,
): number {
	const txt = getText(param);
	const colon = txt.indexOf(":");
	if (colon === -1) {
		return 0;
	}
	const typeText = txt.slice(colon + 1);
	const firstLt = typeText.indexOf("<");
	if (firstLt === -1) {
		return 0;
	}
	let depth = 0;
	let count = 0;
	let inAngles = false;
	for (let i = firstLt; i < typeText.length; i++) {
		const ch = typeText[i];
		if (ch === "<") {
			depth++;
			inAngles = true;
		} else if (ch === ">") {
			depth--;
			if (depth === 0) {
				break;
			}
		} else if (ch === "," && depth === 1) {
			count++;
		}
	}
	return inAngles ? count + 1 : 0;
}

function buildMultilineParens(
	baseIndent: string,
	params: readonly Param[],
	getText: (node: Node) => string,
): string {
	const innerIndent = `${baseIndent}\t`;
	const parts: string[] = params.map((p) => `${innerIndent}${getText(p)}`);
	return `(\n${parts.join(",\n")},\n${baseIndent})`;
}

export const wrapSingleFunctionArgumentWithManyGeneric: Rule.RuleModule = {
	meta: {
		type: "layout",
		docs: {
			description:
                "Wrap single function parameter when its type has more than one generic parameter.",
		},
		fixable: "code",
		schema: [],
		messages: {
			wrap: "Wrap single parameter with multiple generics for readability.",
		},
	},
	create(context) {
		const src = context.sourceCode;

		function getBaseIndent(node: Node): string {
			const { line } = node.loc!.start;
			const lineStart = src.getIndexFromLoc({
				line,
				column: 0,
			});
			const before = src.text.slice(
				lineStart,
				node.range[0],
			);
			const match = before.match(/^[\t ]*/u);
			return match ? match[0] : "";
		}

		function findOpenParen(firstParam: Param): (import("eslint").AST.Token | import("eslint").AST.Comment) | null {
			return src.getTokenBefore(
				firstParam,
				(t) => t.value === "(",
			);
		}

		function findCloseParen(lastParam: Param | Node): (import("eslint").AST.Token | import("eslint").AST.Comment) | null {
			let current: (import("eslint").AST.Token | import("eslint").AST.Comment) | null = src.getTokenAfter(lastParam);
			while (current && current.value !== ")") {
				current = src.getTokenAfter(current);
			}
			return current;
		}

		function shouldWrap(params: readonly Pattern[]): boolean {
			if (params.length !== 1) {
				return false;
			}
			return countGenericTypeParams(
				params[0],
				(n) => src.getText(n),
			) > 1;
		}

		function handleFunction(node: (FunctionDeclaration | ArrowFunctionExpression) & Rule.NodeParentExtension): void {
			const params = node.params;
			if (!shouldWrap(params)) {
				return;
			}

			const baseIndent = getBaseIndent(node);
			const open = findOpenParen(params[0]);
			const close = findCloseParen(params[params.length - 1]);
			if (!open || !close) {
				return;
			}

			const currentText = src.text.slice(
				open.range[0],
				close.range[1],
			);
			// If already multiline, consider it compliant to avoid re-reporting after fix
			if (currentText.includes("\n")) {
				return;
			}
			const desired = buildMultilineParens(
				baseIndent,
				params,
				(n) => src.getText(n),
			);

			if (currentText === desired) {
				return;
			}

			context.report({
				node,
				messageId: "wrap",
				fix(fixer) {
					return fixer.replaceTextRange(
						[open.range[0], close.range[1]],
						desired,
					);
				},
			});
		}

		return {
			FunctionDeclaration: handleFunction,
			ArrowFunctionExpression: handleFunction,
		};
	},
};

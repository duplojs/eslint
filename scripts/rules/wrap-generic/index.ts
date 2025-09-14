import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getBaseIndent(
	src: Rule.RuleContext["sourceCode"],
	node: Node,
): string {
	const { line } = node.loc!.start;
	const lineStart = src.getIndexFromLoc({
		line,
		column: 0,
	});
	const before = src.text.slice(
		lineStart,
		node.range![0],
	);
	const match = before.match(/^[\t ]*/u);
	return match ? match[0] : "";
}

function findFirstTokenAfter(
	src: Rule.RuleContext["sourceCode"],
	start: Token | Node,
	predicate: (t: Token) => boolean,
	stopWhen: (t: Token) => boolean,
): Token | null {
	let current = src.getTokenAfter(start) as Token | null;
	while (current) {
		if (stopWhen(current)) {
			return null;
		}
		if (predicate(current)) {
			return current;
		}
		current = src.getTokenAfter(current) as Token | null;
	}
	return null;
}

function matchClosingAngle(
	src: Rule.RuleContext["sourceCode"],
	open: Token,
): Token | null {
	let depth = 1;
	let current = src.getTokenAfter(open) as Token | null;
	while (current) {
		if (current.value === "<") {
			depth++;
		} else if (current.value === ">") {
			depth--;
			if (depth === 0) {
				return current;
			}
		}
		// Stop if we encounter a newline-terminated token that obviously ends the head
		// We purposefully do not early-stop on other symbols here to allow nested generics.
		current = src.getTokenAfter(current) as Token | null;
	}
	return null;
}

function getIdentifierToken(
	src: Rule.RuleContext["sourceCode"],
	node: any,
): Token | null {
	// Works for FunctionDeclaration, TSInterfaceDeclaration, TSTypeAliasDeclaration
	if (node.id) {
		return src.getFirstToken(node.id) as Token | null;
	}
	// Fallback: first identifier after the keyword (e.g., interface/type)
	const first = src.getFirstToken(node) as Token | null;
	if (!first) {
		return null;
	}
	return findFirstTokenAfter(
		src,
		first,
		(t) => t.type === "Identifier",
		// stop at punctuation starting the next part
		(t) => t.value === "<" || t.value === "(" || t.value === "{" || t.value === "=",
	);
}

function findGenericSpanForFunction(
	src: Rule.RuleContext["sourceCode"],
	node: any,
): {
	open: Token;
	close: Token;
} | null {
	const idTok = getIdentifierToken(
		src,
		node,
	);
	if (!idTok) {
		return null;
	}
	const openParen = findFirstTokenAfter(
		src,
		idTok,
		(t) => t.value === "(",
		() => false,
	);
	if (!openParen) {
		return null;
	}

	const open = findFirstTokenAfter(
		src,
		idTok,
		(t) => t.value === "<",
		(t) => t === openParen,
	);
	if (!open) {
		return null;
	}
	const close = matchClosingAngle(
		src,
		open,
	);
	if (!close) {
		return null;
	}
	// Ensure the generics close before the opening paren
	if (close.range![1] > openParen.range![0]) {
		return null;
	}
	return {
		open,
		close,
	};
}

function findGenericSpanForInterface(
	src: Rule.RuleContext["sourceCode"],
	node: any,
): {
	open: Token;
	close: Token;
} | null {
	const idTok = getIdentifierToken(
		src,
		node,
	);
	if (!idTok) {
		return null;
	}
	const bodyStart = findFirstTokenAfter(
		src,
		idTok,
		(t) => t.value === "{",
		() => false,
	);
	if (!bodyStart) {
		return null;
	}

	const open = findFirstTokenAfter(
		src,
		idTok,
		(t) => t.value === "<",
		(t) => t === bodyStart,
	);
	if (!open) {
		return null;
	}
	const close = matchClosingAngle(
		src,
		open,
	);
	if (!close) {
		return null;
	}
	// Ensure we are before body start
	if (close.range![1] > bodyStart.range![0]) {
		return null;
	}
	return {
		open,
		close,
	};
}

function findGenericSpanForTypeAlias(
	src: Rule.RuleContext["sourceCode"],
	node: any,
): {
	open: Token;
	close: Token;
} | null {
	const idTok = getIdentifierToken(
		src,
		node,
	);
	if (!idTok) {
		return null;
	}
	const equalTok = findFirstTokenAfter(
		src,
		idTok,
		(t) => t.value === "=",
		() => false,
	);
	if (!equalTok) {
		return null;
	}

	const open = findFirstTokenAfter(
		src,
		idTok,
		(t) => t.value === "<",
		(t) => t === equalTok,
	);
	if (!open) {
		return null;
	}
	const close = matchClosingAngle(
		src,
		open,
	);
	if (!close) {
		return null;
	}
	if (close.range![1] > equalTok.range![0]) {
		return null;
	}
	return {
		open,
		close,
	};
}

function splitTopLevelComma(inner: string): string[] {
	const items: string[] = [];
	let current = "";
	let angle = 0;
	let paren = 0;
	let square = 0;
	let curly = 0;
	let inString: null | string = null;
	for (let i = 0; i < inner.length; i++) {
		const ch = inner[i];
		const prev = i > 0 ? inner[i - 1] : "";
		if (inString) {
			current += ch;
			if (ch === inString && prev !== "\\") {
				inString = null;
			}
			continue;
		}
		if (ch === "\"" || ch === "'" || ch === "`") {
			inString = ch;
			current += ch;
			continue;
		}
		if (ch === "<") {
			angle++;
		} else if (ch === ">" && angle > 0) {
			angle--;
		} else if (ch === "(") {
			paren++;
		} else if (ch === ")" && paren > 0) {
			paren--;
		} else if (ch === "[") {
			square++;
		} else if (ch === "]" && square > 0) {
			square--;
		} else if (ch === "{") {
			curly++;
		} else if (ch === "}" && curly > 0) {
			curly--;
		}

		if (ch === "," && angle === 0 && paren === 0 && square === 0 && curly === 0) {
			items.push(current.trim());
			current = "";
			continue;
		}
		current += ch;
	}
	const last = current.trim();
	if (last.length) {
		items.push(last);
	}
	return items.filter((s) => s.length > 0);
}

function buildMultilineGenerics(
	baseIndent: string,
	inner: string,
): string {
	const innerIndent = `${baseIndent}\t`;
	const parts = splitTopLevelComma(inner).map((p) => `${innerIndent}${p}`);
	return `<\n${parts.join(",\n")},\n${baseIndent}>`;
}

export const wrapGeneric: Rule.RuleModule = {
	meta: {
		type: "layout",
		docs: {
			description: "Wrap type parameter lists on declarations to multiline style.",
		},
		fixable: "code",
		schema: [],
		messages: {
			wrap: "Wrap generic type parameters for readability.",
		},
	},
	create(context) {
		const src = context.sourceCode;

		function reportIfGeneric(
			node: Node & Rule.NodeParentExtension,
			span: {
				open: Token;
				close: Token;
			} | null,
		) {
			if (!span) {
				return;
			}
			const baseIndent = getBaseIndent(
				src,
				node,
			);
			const current = src.text.slice(
				span.open.range![0],
				span.close.range![1],
			);
			const inner = src.text.slice(
				span.open.range![1],
				span.close.range![0],
			);
			const desired = buildMultilineGenerics(
				baseIndent,
				inner,
			);
			if (current === desired) {
				return;
			}
			context.report({
				node,
				messageId: "wrap",
				fix(fixer) {
					return fixer.replaceTextRange(
						[span.open.range![0], span.close.range![1]],
						desired,
					);
				},
			});
		}

		return {
			// Function declarations with type parameters
			FunctionDeclaration(node: any) {
				reportIfGeneric(
					node as Node & Rule.NodeParentExtension,
					findGenericSpanForFunction(
						src,
						node,
					),
				);
			},
			// TypeScript-specific declarations
			TSInterfaceDeclaration(node: any) {
				reportIfGeneric(
					node as Node & Rule.NodeParentExtension,
					findGenericSpanForInterface(
						src,
						node,
					),
				);
			},
			TSTypeAliasDeclaration(node: any) {
				reportIfGeneric(
					node as Node & Rule.NodeParentExtension,
					findGenericSpanForTypeAlias(
						src,
						node,
					),
				);
			},
		};
	},
};

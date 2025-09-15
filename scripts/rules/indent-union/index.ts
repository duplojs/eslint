import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getLineIndentFromToken(src: Rule.RuleContext["sourceCode"], tok: Token | Node): string {
    const line = (tok.loc as any).start.line as number;
    const lineStart = src.getIndexFromLoc({ line, column: 0 });
    const before = src.text.slice(lineStart, (tok as any).range[0]);
    const match = before.match(/^[\t ]*/u);
    return match ? match[0] : "";
}

function isParenthesizedUnion(node: any): boolean {
    return !!(node && node.parent && node.parent.type === "TSParenthesizedType");
}

export const indentUnion: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description:
                "Indent wrapped union types by one tab relative to the first line (or opening parenthesis line for parenthesized types).",
        },
        fixable: "code",
        schema: [],
        messages: {
            indent: "Indent wrapped union lines by one tab.",
        },
    },
    create(context) {
        const src = context.sourceCode;

        function handleUnion(node: Node & Rule.NodeParentExtension & { types?: Node[] }) {
            const types = (node as any).types as Node[] | undefined;
            if (!types || types.length < 2) return;

            // Determine the anchor token for indentation
            const firstType = types[0];
            const lastType = types[types.length - 1];
            const firstTok = src.getFirstToken(firstType as any) as Token | null;
            if (!firstTok) return;
            const prevTok = src.getTokenBefore(firstTok) as Token | null;
            const inParens = !!prevTok && prevTok.value === "(";

            let anchorTok: Token | Node | null = inParens ? prevTok : (firstTok as Token);
            if (!anchorTok) return;

            const baseIndent = getLineIndentFromToken(src, anchorTok);
            const desiredIndent = `${baseIndent}\t`;

            // Collect all '|' tokens between first and last types
            const between = src.getTokensBetween(firstType as any, lastType as any) as Token[];
            const pipes = between.filter((t) => t.value === "|");
            if (pipes.length === 0) return;

            const fixes: Rule.Fix[] = [];

            // Special case: parenthesized union should indent the first type line
            if (inParens) {
                const beforeIdx = firstTok.range![0] - 1;
                const nlIdx = src.text.lastIndexOf("\n", beforeIdx);
                if (nlIdx !== -1) {
                    const prefix = src.text.slice(nlIdx + 1, firstTok.range![0]);
                    if (!/[^\t \r]/u.test(prefix) && prefix !== desiredIndent) {
                        fixes.push((fixer) => fixer.replaceTextRange([nlIdx + 1, firstTok.range![0]], desiredIndent));
                    }
                }
            }
            for (const pipe of pipes) {
                // Ensure this '|' starts a new line (wrapped style)
                const beforeIdx = pipe.range![0] - 1;
                const nlIdx = src.text.lastIndexOf("\n", beforeIdx);
                if (nlIdx === -1) continue;
                const prefix = src.text.slice(nlIdx + 1, pipe.range![0]);

                // If non-whitespace precedes on the same line, skip (single-line union)
                if (/[^\t \r]/u.test(prefix)) continue;

                if (prefix !== desiredIndent) {
                    fixes.push((fixer) => fixer.replaceTextRange([nlIdx + 1, pipe.range![0]], desiredIndent));
                }
            }

            if (fixes.length === 0) return;

            context.report({
                node: node as unknown as Node,
                messageId: "indent",
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

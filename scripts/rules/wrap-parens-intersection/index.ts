import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getBaseIndentAtToken(src: Rule.RuleContext["sourceCode"], tok: Token): string {
    const line = tok.loc!.start.line;
    const lineStart = src.getIndexFromLoc({ line, column: 0 });
    const before = src.text.slice(lineStart, tok.range![0]);
    const match = before.match(/^[\t ]*/u);
    return match ? match[0] : "";
}

function buildMultilineParensIntersection(
    baseIndent: string,
    types: readonly Node[],
    getText: (n: Node) => string,
): string {
    const innerIndent = `${baseIndent}\t`;
    const parts: string[] = [];
    if (types.length > 0) {
        parts.push(`${innerIndent}${getText(types[0]).trim()}`);
        for (let i = 1; i < types.length; i++) {
            parts.push(`${innerIndent}& ${getText(types[i]).trim()}`);
        }
    }
    return `(\n${parts.join("\n")}\n${baseIndent})`;
}

export const wrapParensIntersection: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description: "Wrap and format parenthesized intersection types to multiple lines with proper indentation.",
        },
        fixable: "code",
        schema: [],
        messages: {
            wrap: "Wrap intersection inside parentheses across multiple lines.",
        },
    },
    create(context) {
        const src = context.sourceCode;

        function handleIntersection(node: any & Node) {
            // We only operate when the intersection is inside parentheses that enclose a pure type expression
            const first = src.getFirstToken(node) as Token | null;
            if (!first) return;

            let open: Token | null = src.getTokenBefore(first, (t) => t.value === "(") as Token | null;
            let close: Token | null = null;
            while (open) {
                // Find matching close
                let depth = 0;
                let cur = src.getTokenAfter(open) as Token | null;
                close = null;
                const hasColonInside = (() => {
                    let seenColon = false;
                    let walker = cur;
                    while (walker) {
                        if (walker.value === "(") depth++;
                        else if (walker.value === ")") {
                            if (depth === 0) { close = walker; break; }
                            depth--;
                        }
                        if (walker.value === ":") seenColon = true;
                        if (walker.range![1] >= (node as any).range[1] && close) break;
                        walker = src.getTokenAfter(walker) as Token | null;
                    }
                    return seenColon;
                })();

                if (close && open.range![0] < (node as any).range[0] && close.range![1] > (node as any).range[1]) {
                    // Ensure there is at least one '&' inside this paren pair and no ':' (to avoid function params)
                    const innerText = src.text.slice(open.range![1], close.range![0]);
                    if (innerText.includes("&") && !hasColonInside) {
                        break;
                    }
                }
                open = src.getTokenBefore(open, (t) => t.value === "(") as Token | null;
            }
            if (!open || !close) return;

            const types: Node[] = Array.isArray((node as any).types) ? ((node as any).types as Node[]) : [];
            if (types.length <= 1) return;

            const baseIndent = getBaseIndentAtToken(src, open);
            const desired = buildMultilineParensIntersection(baseIndent, types, (n) => src.getText(n));
            const currentText = src.text.slice(open.range![0], close.range![1]);
            if (currentText === desired) return;

            context.report({
                node: node as unknown as Node & Rule.NodeParentExtension,
                messageId: "wrap",
                fix(fixer) {
                    return fixer.replaceTextRange([open!.range![0], close!.range![1]], desired);
                },
            });
        }

        return {
            TSIntersectionType: handleIntersection,
            TSTypeAliasDeclaration(node: any & Node) {
                const typeAnn: any = (node as any).typeAnnotation;
                if (!typeAnn || typeAnn.type !== "TSIntersectionType" || !Array.isArray(typeAnn.types)) return;

                const firstTok = src.getFirstToken(typeAnn) as Token | null;
                if (!firstTok) return;

                const openParenBefore = src.getTokenBefore(firstTok, (t) => t.value === "(") as Token | null;
                const closeParenAfter = openParenBefore ? src.getTokenAfter(typeAnn, (t) => t.value === ")") as Token | null : null;
                const hasWrappingParens = Boolean(openParenBefore && closeParenAfter);
                if (hasWrappingParens) return; // handled by TSIntersectionType visitor

                const equalTok = src.getTokenBefore(firstTok, (t) => t.value === "=") as Token | null;
                if (!equalTok) return;

                const types: Node[] = (typeAnn.types as Node[]);
                if (types.length <= 1) return;

                const baseIndent = getBaseIndentAtToken(src, equalTok);
                const innerIndent = `${baseIndent}\t`;
                const desired = ` ${src.getText(types[0]).trim()}\n${types.slice(1).map((t) => `${innerIndent}& ${src.getText(t).trim()}`).join("\n")}`;

                const replaceStart = equalTok.range![1];
                const replaceEnd = typeAnn.range![1];
                const current = src.text.slice(replaceStart, replaceEnd);
                if (current === desired) return;

                context.report({
                    node: node as unknown as Node & Rule.NodeParentExtension,
                    messageId: "wrap",
                    fix(fixer) {
                        return fixer.replaceTextRange([replaceStart, replaceEnd], desired);
                    },
                });
            },
        } as any;
    },
};

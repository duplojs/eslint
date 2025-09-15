import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getLineStartIndex(src: Rule.RuleContext["sourceCode"], line: number): number {
    return src.getIndexFromLoc({ line, column: 0 });
}

function getLineIndent(src: Rule.RuleContext["sourceCode"], line: number): string {
    const lineStart = getLineStartIndex(src, line);
    // Scan until first non-whitespace
    const text = src.text;
    let i = lineStart;
    while (i < text.length) {
        const ch = text[i];
        if (ch !== "\t" && ch !== " ") break;
        i++;
        // stop at newline just in case (blank line)
        if (ch === "\n") break;
    }
    return text.slice(lineStart, i);
}

export const indentIntersection: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description: "Indent wrapped intersection types so that each '&' line is indented one tab beyond the base line of the first type.",
        },
        fixable: "code",
        schema: [],
        messages: {
            indent: "Indent '&' line by one tab relative to the first type line.",
        },
    },
    create(context) {
        const src = context.sourceCode;

        function handleIntersection(node: any & Node) {
            // node is TSIntersectionType
            if (!node || !Array.isArray(node.types) || node.types.length < 2) return;

            const firstType = node.types[0] as Node;
            const firstLine = firstType.loc!.start.line;
            // Exception: when intersection is parenthesized, indent relative to the
            // line that contains the opening parenthesis, not the first type line.
            let baseLine = firstLine;
            {
                let cur: any = (node as unknown as Rule.NodeParentExtension).parent as (Node & { type?: string; loc?: any }) | undefined;
                while (cur) {
                    if (cur.type === "TSParenthesizedType") {
                        baseLine = cur.loc!.start.line;
                        break;
                    }
                    if (typeof cur.type !== "string" || !cur.type.startsWith("TS")) break;
                    cur = (cur as any).parent;
                }
                if (baseLine === firstLine) {
                    const firstTok = src.getFirstToken(node) as Token | null;
                    if (firstTok) {
                        const prevTok = src.getTokenBefore(firstTok) as Token | null;
                        if (prevTok && prevTok.value === "(") {
                            baseLine = prevTok.loc!.start.line;
                        }
                    }
                }
            }

            const baseIndent = getLineIndent(src, baseLine);
            const expectedIndent = `${baseIndent}\t`;

            // Find all '&' tokens inside this node
            const tokens = src.getTokens(node) as Token[];
            const andTokens = tokens.filter((t) => t.value === "&");
            if (andTokens.length === 0) return;

            // If all '&' are on the same line as the first type, nothing to do
            const anyWrapped = andTokens.some((t) => t.loc!.start.line > firstLine);
            if (!anyWrapped) return;

            const fixes: ReturnType<Rule.ReportFixer["replaceTextRange"]>[] = [];
            // If parenthesized and wrapped, ensure the first type line aligns to expectedIndent
            if (baseLine !== firstLine) {
                const firstTok = src.getFirstToken(firstType) as Token | null;
                if (firstTok) {
                    const lineStart = getLineStartIndex(src, firstLine);
                    const currentIndent = src.text.slice(lineStart, firstTok.range![0]);
                    if (currentIndent !== expectedIndent) {
                        fixes.push((fixer) => fixer.replaceTextRange([lineStart, firstTok.range![0]], expectedIndent));
                    }
                }
            }
            for (const andTok of andTokens) {
                const andLine = andTok.loc!.start.line;
                if (andLine <= firstLine) continue; // only enforce when wrapped to next lines

                const lineStart = getLineStartIndex(src, andLine);
                const currentIndent = src.text.slice(lineStart, andTok.range![0]);
                if (currentIndent === expectedIndent) continue;

                fixes.push((fixer) => fixer.replaceTextRange([lineStart, andTok.range![0]], expectedIndent));
            }

            if (fixes.length === 0) return;

            context.report({
                node: node as unknown as Node & Rule.NodeParentExtension,
                messageId: "indent",
                fix(fixer) {
                    return fixes.map((fn) => fn(fixer));
                },
            });
        }

        return {
            TSIntersectionType: handleIntersection,
        } as any;
    },
};

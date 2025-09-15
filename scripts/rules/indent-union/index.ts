import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getLineStartIndex(src: Rule.RuleContext["sourceCode"], line: number): number {
    return src.getIndexFromLoc({ line, column: 0 });
}

function getLineIndent(src: Rule.RuleContext["sourceCode"], line: number): string {
    const lineStart = getLineStartIndex(src, line);
    const text = src.text;
    let i = lineStart;
    while (i < text.length) {
        const ch = text[i];
        if (ch !== "\t" && ch !== " ") break;
        i++;
        if (ch === "\n") break;
    }
    return text.slice(lineStart, i);
}

export const indentUnion: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description: "Indentation des types union: chaque ligne '|' doit être indentée d'une tabulation au-delà de la ligne du premier type.",
        },
        fixable: "code",
        schema: [],
        messages: {
            indent: "Indenter la ligne '|' d'un tab par rapport à la première ligne du type.",
        },
    },
    create(context) {
        const src = context.sourceCode;

        function handleUnion(node: any & Node) {
            if (!node || !Array.isArray(node.types) || node.types.length < 2) return;

            const firstType = node.types[0] as Node;
            const firstLine = firstType.loc!.start.line;

            // Exception: when union is inside parentheses, indent relative to the start
            // of the line that contains the opening parenthesis, not the first type line.
            // We detect this by checking if the parent is TSParenthesizedType.
            let baseLine = firstLine;
            {
                let cur: any = (node as unknown as Rule.NodeParentExtension).parent as (Node & { type?: string; loc?: any }) | undefined;
                while (cur) {
                    if (cur.type === "TSParenthesizedType") {
                        baseLine = cur.loc!.start.line;
                        break;
                    }
                    // Stop walking when leaving TS type space to avoid matching function parentheses
                    if (typeof cur.type !== "string" || !cur.type.startsWith("TS")) break;
                    cur = (cur as any).parent;
                }
                // Fallback/token-based detection: if the first token is immediately preceded by '(',
                // consider it parenthesized and use that line as base.
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

            const tokens = src.getTokens(node) as Token[];
            const pipeTokens = tokens.filter((t) => t.value === "|");
            if (pipeTokens.length === 0) return;

            const anyWrapped = pipeTokens.some((t) => t.loc!.start.line > firstLine);
            if (!anyWrapped) return;

            const fixes: ReturnType<Rule.ReportFixer["replaceTextRange"]>[] = [];
            // If the union is parenthesized and wrapped, ensure the first type line
            // is also indented one tab from the base (line with '(')
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
            for (const pipe of pipeTokens) {
                const line = pipe.loc!.start.line;
                if (line <= firstLine) continue;
                const lineStart = getLineStartIndex(src, line);
                const currentIndent = src.text.slice(lineStart, pipe.range![0]);
                if (currentIndent === expectedIndent) continue;
                fixes.push((fixer) => fixer.replaceTextRange([lineStart, pipe.range![0]], expectedIndent));
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
            TSUnionType: handleUnion,
        } as any;
    },
};

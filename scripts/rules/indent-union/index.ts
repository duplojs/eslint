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
            const baseIndent = getLineIndent(src, firstLine);
            const expectedIndent = `${baseIndent}\t`;

            const tokens = src.getTokens(node) as Token[];
            const pipeTokens = tokens.filter((t) => t.value === "|");
            if (pipeTokens.length === 0) return;

            const anyWrapped = pipeTokens.some((t) => t.loc!.start.line > firstLine);
            if (!anyWrapped) return;

            const fixes: ReturnType<Rule.ReportFixer["replaceTextRange"]>[] = [];
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


import { type Rule } from "eslint";
import { type Node } from "estree";

type Token = import("eslint").AST.Token | import("eslint").AST.Comment;

function getIdentifierToken(src: Rule.RuleContext["sourceCode"], node: any): Token | null {
    if (node.id) return src.getFirstToken(node.id) as Token | null;
    const first = src.getFirstToken(node) as Token | null;
    if (!first) return null;
    return src.getTokenAfter(first, { includeComments: false }) as Token | null;
}

function findFirstTokenAfter(
    src: Rule.RuleContext["sourceCode"],
    start: Token | Node,
    predicate: (t: Token) => boolean,
    stopWhen: (t: Token) => boolean,
): Token | null {
    let current = src.getTokenAfter(start) as Token | null;
    while (current) {
        if (stopWhen(current)) return null;
        if (predicate(current)) return current;
        current = src.getTokenAfter(current) as Token | null;
    }
    return null;
}

function matchClosingAngle(src: Rule.RuleContext["sourceCode"], open: Token): Token | null {
    let depth = 1;
    let current = src.getTokenAfter(open) as Token | null;
    while (current) {
        if (current.value === "<") depth++;
        else if (current.value === ">") {
            depth--;
            if (depth === 0) return current;
        }
        current = src.getTokenAfter(current) as Token | null;
    }
    return null;
}

function findGenericSpanForFunction(src: Rule.RuleContext["sourceCode"], node: any): { open: Token; close: Token } | null {
    const idTok = getIdentifierToken(src, node);
    if (!idTok) return null;
    const openParen = findFirstTokenAfter(src, idTok, (t) => t.value === "(", () => false);
    if (!openParen) return null;
    const open = findFirstTokenAfter(src, idTok, (t) => t.value === "<", (t) => t === openParen);
    if (!open) return null;
    const close = matchClosingAngle(src, open);
    if (!close) return null;
    if (close.range![1] > openParen.range![0]) return null;
    return { open, close };
}

function findGenericSpanForInterface(src: Rule.RuleContext["sourceCode"], node: any): { open: Token; close: Token } | null {
    const idTok = getIdentifierToken(src, node);
    if (!idTok) return null;
    const bodyStart = findFirstTokenAfter(src, idTok, (t) => t.value === "{", () => false);
    if (!bodyStart) return null;
    const open = findFirstTokenAfter(src, idTok, (t) => t.value === "<", (t) => t === bodyStart);
    if (!open) return null;
    const close = matchClosingAngle(src, open);
    if (!close) return null;
    if (close.range![1] > bodyStart.range![0]) return null;
    return { open, close };
}

function findGenericSpanForTypeAlias(src: Rule.RuleContext["sourceCode"], node: any): { open: Token; close: Token } | null {
    const idTok = getIdentifierToken(src, node);
    if (!idTok) return null;
    const equalTok = findFirstTokenAfter(src, idTok, (t) => t.value === "=", () => false);
    if (!equalTok) return null;
    const open = findFirstTokenAfter(src, idTok, (t) => t.value === "<", (t) => t === equalTok);
    if (!open) return null;
    const close = matchClosingAngle(src, open);
    if (!close) return null;
    if (close.range![1] > equalTok.range![0]) return null;
    return { open, close };
}

function toGenericName(name: string): string {
    if (name.startsWith("Generic")) return name;
    return "Generic" + name[0].toUpperCase() + name.slice(1);
}

export const prefixGeneric: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description: "Prefix generic type parameter names with 'Generic'.",
        },
        fixable: "code",
        schema: [],
        messages: {
            prefix: "Prefix generic type parameter names with 'Generic'.",
        },
    },
    create(context) {
        const src = context.sourceCode;

        function handleNode(node: Node & Rule.NodeParentExtension, span: { open: Token; close: Token } | null) {
            if (!span) return;

            // Walk tokens between < and matching > at top-level (depth 1)
            const fixes: Rule.Fix[] = [];
            let depth = 1;
            let atParamStart = true; // true after '<' or ',' at depth 1
            let current = src.getTokenAfter(span.open) as Token | null;
            while (current && current !== span.close) {
                if (current.value === "<") depth++;
                else if (current.value === ">") depth--;

                if (depth === 1) {
                    if (atParamStart && (current as any).type === "Identifier") {
                        const oldName = String(current.value);
                        const newName = toGenericName(oldName);
                        if (newName !== oldName) {
                            const range: [number, number] = [current.range![0], current.range![1]];
                            fixes.push((f) => f.replaceTextRange(range, newName));
                        }
                        atParamStart = false;
                    }
                    if (current.value === ",") {
                        atParamStart = true;
                    }
                }
                current = src.getTokenAfter(current) as Token | null;
            }

            if (fixes.length === 0) return;
            context.report({
                node,
                messageId: "prefix",
                fix(fixer) {
                    return fixes.map((fn) => fn(fixer));
                },
            });
        }

        return {
            FunctionDeclaration(node: any) {
                handleNode(node, findGenericSpanForFunction(src, node));
            },
            TSInterfaceDeclaration(node: any) {
                handleNode(node, findGenericSpanForInterface(src, node));
            },
            TSTypeAliasDeclaration(node: any) {
                handleNode(node, findGenericSpanForTypeAlias(src, node));
            },
        };
    },
};

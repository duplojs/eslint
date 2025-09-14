import { Rule } from "eslint";
import { FunctionDeclaration, ArrowFunctionExpression, Pattern, Node } from "estree";

type Param = Pattern;

function countGenericTypeParams(param: Param): number {
    if (param.type === "Identifier") {
        const anyParam: any = param as any;
        const annotation = anyParam.typeAnnotation;
        if (annotation && annotation.type === "TSTypeAnnotation") {
            const inner = annotation.typeAnnotation;
            if (inner && inner.type === "TSTypeReference") {
                const tps = inner.typeArguments;
                if (tps) {
                    return tps.params.length;
                }
            }
        }
    }
    return 0;
}

function buildMultilineParens(
    baseIndent: string,
    params: readonly Pattern[],
    getText: (node: Node) => string,
): string {
    const innerIndent = `${baseIndent}\t`;
    const parts: string[] = params.map((p) => `${innerIndent}${getText(p)}`);
    return `(\n${parts.join(",\n")},\n${baseIndent})`;
}

function buildTargetParens(
    baseIndent: string,
    params: readonly Pattern[],
    getText: (node: Node) => string,
): string {
    if (params.length <= 1) {
        if (params.length === 1) {
            return `(${getText(params[0])})`;
        }
        return "()";
    }
    return buildMultilineParens(baseIndent, params, getText);
}

export const wrapManyFunctionArgument: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description:
                "Wrap function parameters when there is more than one argument, or when a single argument has multiple generic type parameters.",
        },
        fixable: "code",
        schema: [],
        messages: {
            wrap: "Wrap function parameters for readability.",
            unwrap: "Use single-line parameter list for single simple parameter.",
        },
    },
    create(context) {
        const src = context.sourceCode;

        function getBaseIndent(node: Node): string {
            const { line } = node.loc!.start;
            const lineStart = src.getIndexFromLoc({ line, column: 0 });
            const before = src.text.slice(lineStart, node.range[0]);
            const match = before.match(/^[\t ]*/u);
            return match ? match[0] : "";
        }

        function findOpenParen(firstParam: Param): (import("eslint").AST.Token | import("eslint").AST.Comment) | null {
            return src.getTokenBefore(firstParam, (t) => t.value === "(");
        }

        function findCloseParen(lastParam: Param | Node): (import("eslint").AST.Token | import("eslint").AST.Comment) | null {
            let current: (import("eslint").AST.Token | import("eslint").AST.Comment) | null = src.getTokenAfter(lastParam);
            while (current && current.value !== ")") {
                current = src.getTokenAfter(current);
            }
            return current;
        }

        function needsMultiline(params: readonly Pattern[]): boolean {
            if (params.length > 1) return true;
            if (params.length === 1) return countGenericTypeParams(params[0]) > 1;
            return false;
        }

        function handleFunction(node: (FunctionDeclaration | ArrowFunctionExpression) & Rule.NodeParentExtension): void {
            const params = node.params;
            if (params.length === 0) return;

            const baseIndent = getBaseIndent(node);
            const open = findOpenParen(params[0]);
            const close = findCloseParen(params[params.length - 1]);
            if (!open || !close) return;

            const currentText = src.text.slice(open.range[0], close.range[1]);

            const multiline = needsMultiline(params);
            const desired = multiline
                ? buildMultilineParens(baseIndent, params, (n) => src.getText(n))
                : buildTargetParens(baseIndent, params, (n) => src.getText(n));

            if (currentText === desired) return;

            context.report({
                node,
                messageId: multiline ? "wrap" : "unwrap",
                fix(fixer) {
                    return fixer.replaceTextRange([open.range[0], close.range[1]], desired);
                },
            });
        }

        return {
            FunctionDeclaration: handleFunction,
            ArrowFunctionExpression: handleFunction,
        }
    },
};

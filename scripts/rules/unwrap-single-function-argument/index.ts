import { Rule } from "eslint";
import { FunctionDeclaration, ArrowFunctionExpression, Pattern, Node } from "estree";

type Param = Pattern;

function countGenericTypeParams(param: Param, getText: (node: Node) => string): number {
    const txt = getText(param);
    const colon = txt.indexOf(":");
    if (colon === -1) return 0;
    const typeText = txt.slice(colon + 1);
    const firstLt = typeText.indexOf("<");
    if (firstLt === -1) return 0;
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
            if (depth === 0) break;
        } else if (ch === "," && depth === 1) {
            count++;
        }
    }
    return inAngles ? count + 1 : 0;
}

export const unwrapSingleFunctionArgument: Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description:
                "Unwrap function parameters when there is only one argument whose type has 0 or 1 generic parameter.",
        },
        fixable: "code",
        schema: [],
        messages: {
            unwrap: "Use single-line parameter list for a single simple parameter.",
        },
    },
    create(context) {
        const src = context.sourceCode;

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

        function shouldUnwrap(params: readonly Pattern[]): boolean {
            if (params.length !== 1) return false;
            return countGenericTypeParams(params[0], (n) => src.getText(n)) <= 1;
        }

        function handleFunction(node: (FunctionDeclaration | ArrowFunctionExpression) & Rule.NodeParentExtension): void {
            const params = node.params;
            if (!shouldUnwrap(params)) return;

            const open = findOpenParen(params[0]);
            const close = findCloseParen(params[params.length - 1]);
            if (!open || !close) return;

            const currentText = src.text.slice(open.range[0], close.range[1]);
            const desired = `(${src.getText(params[0])})`;

            if (currentText === desired) return;

            context.report({
                node,
                messageId: "unwrap",
                fix(fixer) {
                    return fixer.replaceTextRange([open.range[0], close.range[1]], desired);
                },
            });
        }

        return {
            FunctionDeclaration: handleFunction,
            ArrowFunctionExpression: handleFunction,
        };
    },
};


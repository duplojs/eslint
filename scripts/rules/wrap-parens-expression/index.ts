/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ESLintUtils, type TSESLint, type TSESTree } from "@typescript-eslint/utils";

type MessageIds = "unwrapSingle" | "wrapMulti";

// Enforce wrapping newlines around parentheses for multiline/logical cases
// and unwrap unnecessary parentheses for simple single-line expressions.
export const wrapParensExpression: TSESLint.RuleModule<MessageIds, []>
	= ESLintUtils.RuleCreator.withoutDocs<[], MessageIds>({
		meta: {
			type: "layout",
			fixable: "whitespace",
			schema: [],
			messages: {
				unwrapSingle:
					"Keep simple single expressions on one line without extra parentheses.",
				wrapMulti:
					"Wrap parentheses on separate lines and break logical conditions (&&/||) across lines.",
			},
		},
		defaultOptions: [],
		create(context) {
			const sourceCode = context.sourceCode;

			function isMultiline(node: TSESTree.Node): boolean {
				return node.loc.start.line !== node.loc.end.line;
			}

			function getIndentBefore(index: number): string {
				const line = sourceCode.getLocFromIndex(index).line;
				const lineStart = sourceCode.getIndexFromLoc({
					line,
					column: 0,
				});
				const textBefore = sourceCode.text.slice(
					lineStart,
					index,
				);
				const match = /^(\s*)/u.exec(textBefore);
				return match?.[1] ? match[1] : "";
			}

			function tokenValueEquals(
				token: TSESTree.Token,
				value: string,
			): boolean {
				return token.value === value;
			}

			function findParensAroundTest(node: TSESTree.IfStatement | TSESTree.WhileStatement): {
				open: TSESTree.Token;
				close: TSESTree.Token;
			} | null {
				const before = sourceCode.getTokenBefore(node.test);
				const after = sourceCode.getTokenAfter(node.test);
				if (
					!before
					|| !after
				) {
					return null;
				}
				if (
					!tokenValueEquals(
						before,
						"(",
					)
					|| !tokenValueEquals(
						after,
						")",
					)
				) {
					return null;
				}
				return {
					open: before,
					close: after,
				};
			}

			function collectTopLevelLogicalTokens(
				start: TSESTree.Token,
				end: TSESTree.Token,
			): TSESTree.Token[] {
				const ops: TSESTree.Token[] = [];
				let tok: TSESTree.Token | null = sourceCode.getTokenAfter(start);
				let depth = 0;
				while (
					tok
					&& tok.range[0] < end.range[0]
				) {
					if (
						tokenValueEquals(
							tok,
							"(",
						)
					) {
						depth += 1;
					} else if (
						tokenValueEquals(
							tok,
							")",
						)
					) {
						if (depth > 0) {
							depth -= 1;
						}
					} else if (
						depth === 0
						&& (
							tokenValueEquals(
								tok,
								"&&",
							)
							|| tokenValueEquals(
								tok,
								"||",
							)
						)
					) {
						ops.push(tok);
					}
					tok = sourceCode.getTokenAfter(tok);
				}
				return ops;
			}

			function hasTopLevelLogicalBetween(
				start: TSESTree.Token,
				end: TSESTree.Token,
			): boolean {
				return collectTopLevelLogicalTokens(
					start,
					end,
				).length > 0;
			}

			// Spacing after operator is not strictly validated to avoid false positives

			function isWrappedAndSplitCorrectly(
				open: TSESTree.Token,
				close: TSESTree.Token,
			): boolean {
				const first = sourceCode.getTokenAfter(open);
				const last = sourceCode.getTokenBefore(close);
				if (
					!first
					|| !last
				) {
					return false;
				}

				const newlineAfterOpen = open.loc.end.line < first.loc.start.line;
				const newlineBeforeClose = last.loc.end.line < close.loc.start.line;
				if (
					!newlineAfterOpen
					|| !newlineBeforeClose
				) {
					return false;
				}

				// Enforce exact indentation
				const baseIndent = getIndentBefore(open.range[0]);
				const innerIndent = `${baseIndent}\t`;
				const firstIndent = getIndentBefore(first.range[0]);
				if (firstIndent !== innerIndent) {
					return false;
				}
				const closeIndent = getIndentBefore(close.range[0]);
				if (closeIndent !== baseIndent) {
					return false;
				}

				// Additionally, when there are top-level logical operators, ensure each
				// operator starts on its own line (i.e., split conditions across lines).
				const ops = collectTopLevelLogicalTokens(
					open,
					close,
				);
				for (const op of ops) {
					const prev = sourceCode.getTokenBefore(op);
					if (!prev) {
						return false;
					}
					const operatorStartsNewLine = prev.loc.end.line < op.loc.start.line;
					if (!operatorStartsNewLine) {
						return false;
					}
					const opIndent = getIndentBefore(op.range[0]);
					if (opIndent !== innerIndent) {
						return false;
					}
				}

				return true;
			}

			function computeLogicalBreakFixes(
				fixer: TSESLint.RuleFixer,
				open: TSESTree.Token,
				close: TSESTree.Token,
			): TSESLint.RuleFix[] {
				const fixes: TSESLint.RuleFix[] = [];

				const baseIndent = getIndentBefore(open.range[0]);
				const innerIndent = `${baseIndent}\t`;

				// Ensure newline right after "("
				const firstInner = sourceCode.getTokenAfter(open);
				if (firstInner) {
					const needNewlineAfterOpen = open.loc.end.line === firstInner.loc.start.line;
					if (needNewlineAfterOpen) {
						fixes.push(
							fixer.replaceTextRange(
								[open.range[1], firstInner.range[0]],
								`\n${innerIndent}`,
							),
						);
					} else {
						const lineStart = sourceCode.getIndexFromLoc({
							line: firstInner.loc.start.line,
							column: 0,
						});
						const currentIndent = sourceCode.text.slice(
							lineStart,
							firstInner.range[0],
						);
						if (currentIndent !== innerIndent) {
							fixes.push(fixer.replaceTextRange(
								[lineStart, firstInner.range[0]],
								innerIndent,
							));
						}
					}
				}

				// Ensure newline right before ")"
				const lastInner = sourceCode.getTokenBefore(close);
				if (lastInner) {
					const needNewlineBeforeClose = lastInner.loc.end.line === close.loc.start.line;
					if (needNewlineBeforeClose) {
						fixes.push(
							fixer.replaceTextRange(
								[lastInner.range[1], close.range[0]],
								`\n${baseIndent}`,
							),
						);
					} else {
						const lineStart = sourceCode.getIndexFromLoc({
							line: close.loc.start.line,
							column: 0,
						});
						const currentIndent = sourceCode.text.slice(
							lineStart,
							close.range[0],
						);
						if (currentIndent !== baseIndent) {
							fixes.push(fixer.replaceTextRange(
								[lineStart, close.range[0]],
								baseIndent,
							));
						}
					}
				}

				// Split top-level logical operators inside
				let tok: TSESTree.Token | null = firstInner;
				let depth = 0;
				while (
					tok
					&& tok.range[0] < close.range[0]
				) {
					if (
						tokenValueEquals(
							tok,
							"(",
						)
					) {
						// Handle nested parenthesized group: ensure wrapping and operator splitting inside
						// Find the matching close for this nested group without disturbing the outer scan
						let cursor: TSESTree.Token | null = sourceCode.getTokenAfter(tok);
						let nest = 1;
						while (
							cursor
							&& nest > 0
						) {
							if (
								tokenValueEquals(
									cursor,
									"(",
								)
							) {
								nest += 1;
							} else if (
								tokenValueEquals(
									cursor,
									")",
								)
							) {
								nest -= 1;
								if (nest === 0) {
									break;
								}
							}
							cursor = sourceCode.getTokenAfter(cursor);
						}
						if (cursor) {
							// If the nested group contains top-level logical operators, apply fixes within it
							if (
								hasTopLevelLogicalBetween(
									tok,
									cursor,
								)
							) {
								fixes.push(
									...computeLogicalBreakFixes(
										fixer,
										tok,
										cursor,
									),
								);
							}
						}
						depth += 1;
						tok = sourceCode.getTokenAfter(tok);
						continue;
					}
					if (
						tokenValueEquals(
							tok,
							")",
						)
					) {
						if (depth > 0) {
							depth -= 1;
						}
						tok = sourceCode.getTokenAfter(tok);
						continue;
					}

					const isTopLevelLogical
						= depth === 0 && (
							tokenValueEquals(
								tok,
								"&&",
							)
							|| tokenValueEquals(
								tok,
								"||",
							)
						);

					if (isTopLevelLogical) {
						const prev = sourceCode.getTokenBefore(tok);
						const next = sourceCode.getTokenAfter(tok);
						if (
							prev
							&& prev.loc.end.line === tok.loc.start.line
						) {
							fixes.push(
								fixer.replaceTextRange(
									[prev.range[1], tok.range[0]],
									`\n${innerIndent}`,
								),
							);
						} else {
							const lineStart = sourceCode.getIndexFromLoc({
								line: tok.loc.start.line,
								column: 0,
							});
							const currentIndent = sourceCode.text.slice(
								lineStart,
								tok.range[0],
							);
							if (currentIndent !== innerIndent) {
								fixes.push(fixer.replaceTextRange(
									[lineStart, tok.range[0]],
									innerIndent,
								));
							}
						}
						if (next) {
						// Ensure exactly one space after operator
							fixes.push(
								fixer.replaceTextRange(
									[tok.range[1], next.range[0]],
									" ",
								),
							);
						}
					}

					tok = sourceCode.getTokenAfter(tok);
				}

				return fixes;
			}

			function computeUnwrapParenthesesFixes(
				fixer: TSESLint.RuleFixer,
				open: TSESTree.Token,
				close: TSESTree.Token,
			): TSESLint.RuleFix[] {
				const fixes: TSESLint.RuleFix[] = [];

				const first = sourceCode.getTokenAfter(open);
				const last = sourceCode.getTokenBefore(close);
				if (
					!first
					|| !last
				) {
					return fixes;
				}

				// Remove whitespace immediately after "(" and immediately before ")"
				if (first.range[0] > open.range[1]) {
					fixes.push(fixer.replaceTextRange(
						[open.range[1], first.range[0]],
						"",
					));
				}
				if (close.range[0] > last.range[1]) {
					fixes.push(fixer.replaceTextRange(
						[last.range[1], close.range[0]],
						"",
					));
				}

				// Remove the parentheses themselves
				fixes.push(fixer.removeRange([open.range[0], open.range[1]]));
				fixes.push(fixer.removeRange([close.range[0], close.range[1]]));

				return fixes;
			}

			function reportIfOrWhile(node: TSESTree.IfStatement | TSESTree.WhileStatement): void {
				const parens = findParensAroundTest(node);
				if (!parens) {
					return;
				}

				const { open, close } = parens;
				const test = node.test;

				const first = sourceCode.getFirstToken(test);
				const last = sourceCode.getLastToken(test);
				if (
					!first
					|| !last
				) {
					return;
				}

				const hasLogical = hasTopLevelLogicalBetween(
					open,
					close,
				);
				const wantWrap = hasLogical || isMultiline(test);

				const newlineAfterOpen = open.loc.end.line < first.loc.start.line;
				const newlineBeforeClose = last.loc.end.line < close.loc.start.line;

				if (wantWrap) {
					const ok = isWrappedAndSplitCorrectly(
						open,
						close,
					);
					if (!ok) {
						context.report({
							node: test,
							messageId: "wrapMulti",
							fix: (fixer) => computeLogicalBreakFixes(
								fixer,
								open,
								close,
							),
						});
					}
				} else if (
					newlineAfterOpen
					|| newlineBeforeClose
				) {
					// If the test is simple, keep it on one line inside parens.
					context.report({
						node: test,
						messageId: "unwrapSingle",
						fix: (fixer) => {
							const fixes: TSESLint.RuleFix[] = [];
							if (newlineAfterOpen) {
								fixes.push(
									fixer.replaceTextRange(
										[open.range[1], first.range[0]],
										" ",
									),
								);
							}
							if (newlineBeforeClose) {
								fixes.push(
									fixer.replaceTextRange(
										[last.range[1], close.range[0]],
										"",
									),
								);
							}
							return fixes;
						},
					});
				}
			}

			function handleParenthesizedExpression(node: TSESTree.Node): void {
				const open = sourceCode.getFirstToken(node);
				const close = sourceCode.getLastToken(node);
				if (
					!open
					|| !close
				) {
					return;
				}

				const first = sourceCode.getTokenAfter(open);
				const last = sourceCode.getTokenBefore(close);
				if (
					!first
					|| !last
				) {
					return;
				}

				const hasLogical = hasTopLevelLogicalBetween(
					open,
					close,
				);

				if (hasLogical) {
					const ok = isWrappedAndSplitCorrectly(
						open,
						close,
					);
					if (!ok) {
						// Ensure parentheses are wrapped and break logicals across lines.
						context.report({
							node,
							messageId: "wrapMulti",
							fix: (fixer) => computeLogicalBreakFixes(
								fixer,
								open,
								close,
							),
						});
					}
					return;
				}

				// No logical operator at top-level inside parentheses: unwrap.
				// Keep side-effects minimal and whitespace safe.
				context.report({
					node,
					messageId: "unwrapSingle",
					fix: (fixer) => computeUnwrapParenthesesFixes(
						fixer,
						open,
						close,
					),
				});
			}

			return {
				IfStatement: reportIfOrWhile,
				WhileStatement: reportIfOrWhile,
				ParenthesizedExpression: handleParenthesizedExpression,
				LogicalExpression(node: TSESTree.LogicalExpression) {
					// Handle general cases like const x = (a && b);
					const before = sourceCode.getTokenBefore(node);
					const after = sourceCode.getTokenAfter(node);
					if (
						!before
						|| !after
						|| !tokenValueEquals(
							before,
							"(",
						)
						|| !tokenValueEquals(
							after,
							")",
						)
					) {
						return;
					}
					const ok = isWrappedAndSplitCorrectly(
						before,
						after,
					);
					if (!ok) {
						context.report({
							node,
							messageId: "wrapMulti",
							fix: (fixer) => computeLogicalBreakFixes(
								fixer,
								before,
								after,
							),
						});
					}
				},
			};
		},
	});

//@ts-nocheck

// single-line union inside parens
type Test1 = (
	string
	| number
);

// multi-line, but still on same line inside parens
type Test2 = (
	string
	| number
	| bigint
);

// closing paren on same line as last type
type Test3 = (
	string
	| number
);

// opening paren on same line, then newline before close
type Test4 = (
	string
	| number
);

// extra blank line then content
type Test5 = (
	string
	| number
	| bigint
);

// mixed spacing with '|' chained on one line
type Test6 = (
	string
	| number
	| bigint
);

[].reduce(
	(
		acc,
		value: string
			| number
			| bigint,
	) => acc,
	{},
);

function test(
	arg: string
		| number,
) {

}

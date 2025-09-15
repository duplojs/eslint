//@ts-nocheck

// single-line intersection inside parens
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

// generic constraint with parenthesized intersection
type TestGeneric<
	GenericT extends (
		string
		| number
		| bigint
	),
> = {

};

// interface with generic constraint
interface ITest<
	GenericT extends (
		string
		| number
		| bigint
	),
> {

}

// function generic constraint
function fn<
	GenericT extends (
		string
		| number
		| bigint
	),
>() {

}

// function param annotated with parenthesized intersection
function test(
	arg: (
		string
		| number
		| bigint
	),
) {

}

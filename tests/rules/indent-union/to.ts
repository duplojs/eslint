//@ts-nocheck

// type alias
type TestA = string
	| number;

// over-indented
type TestB = string
	| number;

// generic type alias constraints
type TestC<
	GenericT extends string
		| number,
> = {};

type TestD<
	GenericT extends string
		| number,
> = {};

type TestE<
	GenericT extends string
		| number,
> = {};

// interface generic constraints
interface TestF<
	GenericT extends string
		| number,
> {}

// function param annotation
function foo(
	arg: string
		| number,
) {

}

function bar(
	arg: string
		| number,
) {

}

{
	// nested scope
	type Nested = string
		| number;

	function nested(
		arg: string
			| number,
	) {

	}

	{
		type Nested = string
			| number
			| bigint;
	}
}

// parenthesized union in type alias (exception)
type TestParenA = (
	"test"
	| "test"
);

// nested scope with parenthesized union (exception)
{
	type TestParenB = (
		"a"
		| "b"
	);
}

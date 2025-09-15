//@ts-nocheck

// type alias
type TestA = string
& number

type TestA = string
& number
& bigint

// over-indented
type TestB = string
		& number

// generic type alias constraints
type TestC<
	GenericT extends string
& number
> = {}

type TestD<
	GenericT extends string
			& number
> = {}

type TestE<
	GenericT extends string
	& number
> = {}

// interface generic constraints
interface TestF<
	GenericT extends string
	& number
> {}

interface TestF<
	GenericT extends string
	& number,
	GenericT extends string
& number
& bigint
> {}

// function param annotation
function foo(
	arg: string
& number
) {

}

// parenthesized intersection in type alias (exception)
type TestParenA = (
"test"
& "test"
);

// nested scope with parenthesized intersection (exception)
{
	type TestParenB = (
			"a"
	& "b"
	);
}

function bar(
	arg: string
	& number
) {

}

{
	// nested scope
	type Nested = string
& number

	function nested(
		arg: string
& number
	) {

	}

	{
		type Nested = string
& number
					& bigint
	}
}

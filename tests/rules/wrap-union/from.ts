//@ts-nocheck

type Test1 = string | number

type Test2 = string | number | bigint

type Test3 = string | number

type Test4 = 
	string | number

type Test5 = 
	string | number | bigint

type Test6 = string 
	| number | bigint

type Test = (
	string & number & bigint
)


type Test = (
	string 
	& number & bigint
)

[].reduce(
	(
		acc,
		value: string | number | bigint,
	) => acc,
	{},
);

function test(
	arg: string | number
) {
}

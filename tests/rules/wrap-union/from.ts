//@ts-nocheck

// single-line union
type Test1 = string | number

// multi-line, but chained on same line
type Test2 = 
	string | number | bigint

// two members on one line, newline after
type Test3 = 
	string | number

// same-line again
type Test4 = string | number

// extra mixed spacing
type Test5 = 
	string | number | bigint

// mixed spacing with '|' chained on one line
type Test6 = 
	string 
	| number | bigint

// union inside parameter type annotation in arrow fn
[].reduce(
	(
		acc,
		value: string | number | bigint,
	) => acc,
	{},
);

// union inside parameter type annotation in function
function test(
	arg: string | number
) {

}

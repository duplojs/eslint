//@ts-nocheck

// Single-line generics should be wrapped
function test<
	T extends unknown,
	A extends unknown,
>(arg1: string) {

}

function test<
	T extends unknown,
>(
	arg1: string,
	arg2: number,
	arg3: number,
) {

}

interface Test<
	T extends unknown,
	A extends unknown,
> {

}

type Test<
	T extends unknown,
> = {

};

// Poorly-wrapped generics should be normalized
function test<
	T extends unknown,
	A extends unknown,
>(arg1: string) {

}

function test<
	T extends unknown,
>(
	arg1: string,
	arg2: number,
	arg3: number,
) {

}

interface Test<
	T extends unknown,
	A extends unknown,
> {

}

type Test<
	T extends unknown,
> = {

};

{
	// nested scope variations
	function nested<
		T extends unknown,
	>(arg1: string) {

	}

	interface Nested<
		T extends unknown,
	> {

	}

	type Nested<
		T extends unknown,
		A extends unknown,
	> = {

	};
}

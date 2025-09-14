//@ts-nocheck

// Single-line generics should be wrapped
function test<
	GenericT extends unknown,
	GenericA extends unknown,
>(arg1: string) {

}

function test<
	GenericT extends unknown,
>(
	arg1: string,
	arg2: number,
	arg3: number,
) {

}

interface Test<
	GenericT extends unknown,
	GenericA extends unknown,
> {

}

type Test<
	GenericT extends unknown,
> = {

};

// Poorly-wrapped generics should be normalized
function test<
	GenericT extends unknown,
	GenericA extends unknown,
>(arg1: string) {

}

function test<
	GenericT extends unknown,
>(
	arg1: string,
	arg2: number,
	arg3: number,
) {

}

interface Test<
	GenericT extends unknown,
	GenericA extends unknown,
> {

}

type Test<
	GenericT extends unknown,
> = {

};

{
	// nested scope variations
	function nested<
		GenericT extends unknown,
	>(arg1: string) {

	}

	interface Nested<
		GenericT extends unknown,
	> {

	}

	type Nested<
		GenericT extends unknown,
		GenericA extends unknown,
	> = {

	};
}

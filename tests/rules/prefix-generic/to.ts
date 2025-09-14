//@ts-nocheck

function test<
	GenericToto extends unknown,
>(arg1: string) {

}

function test<
	GenericToTo extends unknown,
>(
	arg1: string,
	arg2: number,
	arg3: number,
) {

}

interface Test<
	GenericToTo extends unknown,
> {

}

type Test<
	GenericIi extends unknown,
> = {

};

{
	function nested<
		GenericAlpha extends unknown,
		GenericBeta extends unknown,
	>(arg: string) {

	}

	interface Nested<
		GenericGamma extends unknown,
	> {

	}

	type Alias<
		GenericDelta extends unknown,
	> = {

	};
}


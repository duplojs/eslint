//@ts-nocheck

function test<
	toto extends unknown
>(arg1: string) {

}

function test<
	ToTo extends unknown
>(arg1: string, arg2: number, arg3: number) {

}

interface Test<
	ToTo extends unknown
> {

}

type Test<
	ii extends unknown
> = {

}

{
	function nested<
		alpha extends unknown,
		Beta extends unknown,
	>(arg: string) {

	}

	interface Nested<
		gamma extends unknown,
	> {

	}

	type Alias<
		delta extends unknown,
	> = {

	}
}


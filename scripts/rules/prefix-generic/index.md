## prefix-generic

tout les generic de fonction au d'interface doivent étre prefixer de du mot "Generic"

incorrect
```ts
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
```

incorrect
```ts
function test<
	GenericToto extends unknown
>(arg1: string) {

}

function test<
	GenericToTo extends unknown
>(arg1: string, arg2: number, arg3: number) {

}

interface Test<
	GenericToTo extends unknown
> {

}

type Test<
	GenericIi extends unknown
> = {

}
```
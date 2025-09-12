## wrap-generic

dans le cas ou la déclaration d'un fonction posséde un généric, il faut le wrap.

incorrect
```ts
function test<T extends unknown, A extends unknown>(arg1: string) {

}

function test<T extends unknown>(arg1: string, arg2: number, arg3: number) {

}

interface Test<T extends unknown, A extends unknown> {

}

type Test<T extends unknown> = {

}

```

incorrect
```ts
function test<
	T extends unknown, 
	A extends unknown
>(arg1: string) {
	
}

function test<
	T extends unknown
>(
	arg1: string, 
	arg2: number, 
	arg3: number
) {

}

interface Test<
	T extends unknown, 
	A extends unknown
> {

}

type Test<
	T extends unknown
> = {

}
```
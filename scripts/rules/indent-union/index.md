## indent-union

cette régle de formattage serre a dicter comment doit s'indenter les union dans le code.

exemple incorrect:
```ts
type test = string
| number

type test = string
		| number

type test<
	GenericT extends string
| number
> = {} 

type test<
	GenericT extends string
			| number
> = {} 

type test<
	GenericT extends string
	| number
> = {}

interface test<
	GenericT extends string
	| number
> {} 

function test(
	arg: string
| number
) {

}

function test(
	arg: string
	| number
) {

}
```

exemple correct:
```ts
type test = string
	| number

type test = string
	| number

type test<
	GenericT extends string
		| number
> = {} 

type test<
	GenericT extends string
		| number
> = {} 

type test<
	GenericT extends string
		| number
> = {}

interface test<
	GenericT extends string
		| number
> {} 

function test(
	arg: string
		| number
) {

}

function test(
	arg: string
		| number
) {

}
```

explication en details:
Quand une union est wrapper, l'indentation ce fait fait de 1 pars rapport au debut de la ligne sur la qu'elle ce situ le premier type.

```ts
type test = string // premier type
	| number // indentation de 1

{
	type test = string // premier type
		| number // indentation de 1
}

function test(
	arg: string // premier type
		| number //indentation de 1
) {

}

{
	function test(
		arg: string // premier type
			| number //indentation de 1
	) {

	}
}

function test(
	// \/ debut de la ligne qui fait office de référence  
		arg: string // premier type
			| number //indentation de 1
	// /\  /\ indentation de 1 tab	
	) {

	}
```


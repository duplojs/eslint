## wrap-many-function-argument

Cette régle de formattage wrap les argument dans les declaration de fonctions quand il y a plus de 1 argument.

exemple incorrect :

```ts
function test(arg1: string, arg2: string){

}

const test = (arg1: string, arg2: string, arg3: string) => {

}

[].reduce(
	(acc, value) => {

	},
	{}
)
```

exemple correct: 

```ts
function test(
	arg1: string, 
	arg2: string
){

}

const test = (
	arg1: string, 
	arg2: string, 
	arg3: string
) => {

}

[].reduce(
	(
		acc, 
		value
	) => {

	},
	{}
)
```
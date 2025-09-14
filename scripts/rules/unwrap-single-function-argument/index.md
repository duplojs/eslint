## unwrap-single-function-argument

Cette régle de formattage unwrap la déclaration des argument de function quand les fonction n'a que un argument typé avec un type qui a 0 ou 1 généric pas plus et qu'il est n'est pas en union ou intersection. 

exemple incorrect:
```ts
function test(
	arg1: string
) {

}

function test(
	arg1: MyInterface<string>
) {
	
}

const test = (
	arg1: string
) => {

}

const test = (
	arg1: MyInterface<string>
) => {
	
}
```

exemple correct:
```ts
function test(arg1: string) {

}

function test(arg1: MyInterface<string>) {
	
}

const test = (arg1: string) => {

}

const test = (arg1: MyInterface<string>) => {
	
}
```

exeption : 
```ts
function test(
	arg1: string | number
) {

}

function test(
	arg1: MyInterface<string> | number
) {
	
}
```
## wrap-single-function-argument-with-many-generic

Cette régle de formattage wrap la déclaration d'argument des fonction avec un seul argument qui est typé avec un type qui a plus de 1 généric

exemple incorrect:
```ts
function test(arg1: MyInterface<string, number>) {

}

const test = (arg1: MyInterface<string, number>) => {

}
```

exemple correct:
```ts
function test(
	arg1: MyInterface<string, number>
) {

}

const test = (
	arg1: MyInterface<string, number>
) => {

}
```
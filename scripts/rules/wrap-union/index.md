## wrap-parens-union

cette régle de formattage serre a wrapper automatiqument les union dans des parentaise

exemple incorrect:
```ts
type Test = string | number

type Test = 
	string | number | bigint


type Test = 
	string | number

type Test = string | number


type Test = 
	string | number | bigint


type Test = 
	string 
	| number | bigint

[].reduce(
	(
		acc,
		value: string | number | bigint,
	) => acc,
	{},
);

function test(
	arg: string | number
) {

}
```

exemple correct:
```ts
type Test = 
	string 
	| number


type Test = 
	string 
	| number
	| bigint


type Test = 
	string 
	| number


type Test = 
	string 
	| number


type Test = 
	string 
	| number
	| bigint


type Test = 
	string 
	| number
	| bigint

[].reduce(
	(
		acc,
		value: string 
			| number 
			| bigint,
	) => acc,
	{},
);

function test(
	arg: string 
		| number
) {

}
```
## indent-parens-union

cette régle de formattage serre a wrapper automatiqument les union dans des parentaise

exemple incorrect:
```ts
type Test = (string | number)

type Test = (
	string | number | bigint
)

type Test = (
	string | number)

type Test = (string | number
)

type Test = (
	
	string | number | bigint
)

type Test<
	GenericT extends (
		string 
		| number | bigint)
> = {

}

interface Test<
	GenericT extends (
		string 
		| number | bigint)
> = {

}

function test<
	GenericT extends (
		string 
		| number | bigint)
>(){

}

function test(
	test: (
		string 
		| number | bigint)
){

}
```

exemple correct:
```ts
type Test = (
	string 
	| number
)

type Test = (
	string 
	| number
	| bigint
)

type Test = (
	string 
	| number
)

type Test = (
	string 
	| number
)

type Test = (
	string 
	| number
	| bigint
)

type Test = (
	string 
	| number
	| bigint
)

type Test<
	GenericT extends (
		string 
		| number 
		| bigint
	)
> = {

}

interface Test<
	GenericT extends (
		string 
		| number 
		| bigint
	)
> = {

}

function test<
	GenericT extends (
		string 
		| number 
		| bigint
	)
>(){

}

function test(
	test: (
		string 
		| number 
		| bigint
	)
){

}
```
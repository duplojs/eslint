## wrap-parens-union

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

type Test = (
	string 
	| number | bigint

)
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
```
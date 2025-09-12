## wrap-parens-expression

The `wrap-parens-expression` rule improves the readability of conditions wrapped in parentheses.
This rule currently targets:
- `if` conditions
- `while` conditions

Incorrect examples (a single simple expression split across lines):
```ts
if (
	condition === test) {
}

// or misplaced newlines around parentheses
if (condition === test
) {
}

if (
	condition === test
) {
}
```

Correct examples (keep simple conditions on one line):
```ts
if (condition === test) {
}
```

Exception — when a side of the expression is already wrapped across multiple lines (e.g. a property chain), the parentheses must be wrapped too:
```ts
if (
	condition
		.prop
		.test === test
) {
}

if (
	test === condition
		.prop
		.test
) {
}
```

Multiple conditions must be wrapped for clarity:

Incorrect examples:
```ts
if (condition === test && condition === test) {
}

if (
	condition === test && condition === test) {
}

if (condition === test && condition === test
) {
}

if (condition === test || (condition === test && condition === test)) {
}
```

Correct examples:
```ts
if (
	condition === test
	&& condition === test
) {
}

if (
	test === condition
		.prop
		.test
	&& condition === test
) {
}

if (
	condition === test
	|| (
		condition === test
		&& condition === test
	)
) {
}
```

Additional examples for clarity:

Incorrect:
```ts
const result = (test === 1 && bo === 2);

const result = (
	test === 1
);


if (
	!newlineAfterOpen || !newlineBeforeClose
) {

}

if (
	!newlineAfterOpen 
		|| !newlineBeforeClose
) {

}

if (
	!newlineAfterOpen 
|| !newlineBeforeClose
) {
	
}


if (fnc(
	test,
	toto,
)) {

}

if (
	depth === 0
	&& (
		tokenValueEquals(
			tok,
			"&&",
		) || tokenValueEquals(
			tok,
			"||",
		)
	)
) {
}
```

Correct:
```ts
const result = (
	test === 1 
	&& bo === 2
);

const result = test === 1;


if (
	!newlineAfterOpen 
	|| !newlineBeforeClose
) {

}

if (
	!newlineAfterOpen 
	|| !newlineBeforeClose
) {

}

if (
	!newlineAfterOpen 
	|| !newlineBeforeClose
) {

}

if (
	fnc(
		test,
		toto,
	)
) {

}

if (
	depth === 0
	&& (
		tokenValueEquals(
			tok,
			"&&",
		) 
		|| tokenValueEquals(
			tok,
			"||",
		)
	)
) {
}
```

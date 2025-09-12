## wrap-function-argument

**But :** Lorsque la déclaration d'une fonction possède plus d'un argument, chaque argument doit être sur sa propre ligne, entre parenthèses ouvrante et fermante, pour garantir une lisibilité maximale.

ecxeption: si la fonction posséde un seul argument et que c'est un type qui prend max 1 generic, la fonction ne doit pas ce wrap. parcontre si le type prend plus de 1 generic, la fonction de wrap.

### ❌ Exemples de code non conforme

```ts
function test(arg1: string, arg2: number) {}
function test(arg1: string, arg2: number, arg3: number) {}
```

```ts
function test(arg1: string,
	arg2: number) {}
```

```ts
function test(
	arg1: string
) {}

function test(
	arg1: MyInsterface<string>
) {}

function test(arg1: MyInsterface2<string, number>) {}
```

### ✅ Exemple de code conforme

```ts
function test(
	arg1: string,
	arg2: number
) {}

function test(
	arg1: string,
	arg2: number,
	arg3: number
) {}
```

```ts
function test(arg1: string) {}

function test(arg1: MyInsterface<string>) {}

function test(
	arg1: MyInsterface2<string, number>
) {}
```
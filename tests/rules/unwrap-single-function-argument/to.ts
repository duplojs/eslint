//@ts-nocheck

function test(arg1: string) {

}

function test(arg1: MyInterface<string>) {

}

const test = (arg1: string) => {

};

const test = (arg1: MyInterface<string>) => {

};

// Exceptions: union and intersection should stay wrapped
function test(
	arg1: string | number,
) {

}

function test(
	arg1: MyInterface<string> | number,
) {

}

const test = (
	arg1: string | number,
) => {

};

const test = (
	arg1: MyInterface<string> & { id: number },
) => {

};

{
	function test(arg1: string) {

	}

	function test(arg1: MyInterface<string>) {

	}

	const test = (arg1: string) => {

	};

	const test = (arg1: MyInterface<string>) => {

	};
}

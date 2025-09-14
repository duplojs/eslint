//@ts-nocheck

function test(
	arg1: MyInterface<string, number>,
) {

}

const test = (
	arg1: MyInterface<string, number>,
) => {

};

{
	function test(
		arg1: MyInterface<string, number>,
	) {

	}

	const test = (
		arg1: MyInterface<string, number>,
	) => {

	};
}

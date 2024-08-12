interface maSuperInterface {
	prop1: string;
	prop2: string;
	prop3: number;
}

type myUnion =
    | "toto"
    | "tota"
    | "totu";

function tto() {
	return "tt";
}

class SuperClass {
	constructor(
		private toto: string,
	) {
		toto.split("t");
	}
}

const grosLolo = new SuperClass("boobs");

const res = grosLolo
	? grosLolo
	: true;

const test = {
	toto: "tttt",
	rrrr: 12,
	ttt: [15, "beute"],
};

const lala = { yo: 55 };

type AnyFunction = (...args: any) => any;

type PromiseOrNot<T> = T | Promise<T>;

export class Hook<
	args extends any[] = [],
	subscriber extends AnyFunction = (...args: args) => PromiseOrNot<boolean | void>,
> {
	constructor(numberArgs: args["length"]) {
		this.numberArgs = numberArgs;
	}

	private numberArgs: number;

	public subscribers: Array<subscriber | Hook<args, subscriber>> = [];

	addSubscriber(
		subscriber: subscriber | Hook<args, subscriber>,
		...subscribers: Array<subscriber | Hook<args, subscriber>>
	) {
		this.subscribers.push(subscriber, ...subscribers);
	}

	removeSubscriber(subscriber: subscriber | Hook<args>) {
		const index = this.subscribers.findIndex((sub) => sub === subscriber);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	removeAllSubscriber() {
		this.subscribers = [];
	}

	launchSubscriber(...args: args): boolean | void {
		for (const subscriber of this.subscribers) {
			if (subscriber instanceof Hook) {
				if (subscriber.launchSubscriber(...args) === true) {
					return true;
				}
			} else if (subscriber(...args) === true) {
				return true;
			}
		}
	}

	async launchSubscriberAsync(...args: args): Promise<boolean | void> {
		for (const subscriber of this.subscribers) {
			if (subscriber instanceof Hook) {
				if (await subscriber.launchSubscriberAsync(...args) === true) {
					return true;
				}
			} else if (await subscriber(...args) === true) {
				return true;
			}
		}
	}

	launchAllSubscriberAsync(...args: args): Promise<unknown> {
		return Promise.all(
			(
				function lauchDeepFunctionSubscriber(subscribers: Array<subscriber | Hook<args, subscriber>>): unknown[] {
					const PromiseSubscribersCollection: unknown[] = [];

					subscribers.forEach((subscriber) => {
						if (typeof subscriber === "function") {
							PromiseSubscribersCollection.push(subscriber(...args));
						} else {
							PromiseSubscribersCollection.push(
								...lauchDeepFunctionSubscriber(subscriber.subscribers),
							);
						}
					});

					return PromiseSubscribersCollection;
				}
			)(this.subscribers),
		);
	}

	hasSubscriber(subscriber: subscriber | Hook<args, subscriber>) {
		return Boolean(this.subscribers.find((f) => f === subscriber));
	}

	build(): subscriber {
		const subscribers = (
			function findSubscribers(
				subscribers: Array<subscriber | Hook<args, subscriber>>,
				flatSubscribers: subscriber[] = [],
			) {
				subscribers.forEach((subscriber) => {
					if (subscriber instanceof Hook) {
						findSubscribers(subscriber.subscribers, flatSubscribers);
					} else {
						flatSubscribers.push(subscriber);
					}
				});
				return flatSubscribers;
			}
		)(this.subscribers);

		const mapArg = new Array(this.numberArgs).fill(undefined)
			.map((v, i) => `arg${i}`)
			.join(", ");
		const contentFunction = subscribers.map((v, i) => /* js */`
			if(${(v.constructor.name === "AsyncFunction" ? "await " : "")}this.subscribers[${i}](${mapArg}) === true) return;
		`).join("");

		return eval(/* js */`(${(/await/.test(contentFunction) ? "async " : "")}function(${mapArg}){\n${contentFunction}\n})`).bind({ subscribers });
	}
}


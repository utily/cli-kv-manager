import { Client as StateClient } from "./Client"

export class State {
	constructor(readonly client: State.Client) {}
	static create(url: string, key?: string): State {
		return new this(new State.Client(url, key))
	}
}
export namespace State {
	export import Client = StateClient
}
process.once("SIGINT", _ => console.error("shutting down"))

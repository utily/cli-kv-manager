import { http } from "cloudly-http"
import { storage } from "cloudly-storage"
import { Client as StateClient } from "./Client"
import { ListOptions as StateListOptions } from "./ListOptions"

export class State {
	constructor(private readonly client: State.Client) {}
	async list(
		options: State.ListOptions,
		process = async (
			response: storage.Continuable<storage.KeyValueStore.ListItem<any, any>>
		): Promise<boolean | string> => {
			console.log(JSON.stringify(response, undefined, "\t"))
			return true
		}
	): Promise<boolean | string> {
		const result = await this.client.list(State.ListOptions.to(options))
		return (
			!!result &&
			(await process(result)) &&
			(!result.cursor ||
				(!options.all ? result.cursor : await this.list({ ...options, cursor: result.cursor }, process)))
		)
	}
	async migrate(options: State.ListOptions, target: State.Client): Promise<boolean | string> {
		return this.list(options, async response => (await this.client.append(response))?.length == response.length)
	}
	static create(url: string, authorization?: http.Authorization): State {
		return new this(State.Client.create(url, authorization))
	}
}
export namespace State {
	export import Client = StateClient
	export import ListOptions = StateListOptions
}
process.once("SIGINT", _ => console.error("shutting down"))

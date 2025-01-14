import { http } from "cloudly-http"
import { storage } from "cloudly-storage"

export class Client {
	private readonly client: http.Client
	constructor(url: string, key?: string) {
		this.client = new http.Client(url, key)
	}
	set authorization(value: http.Authorization) {
		this.client.authorization = value
	}
	async append(
		data: storage.KeyValueStore.ListItem<any, any>[]
	): Promise<storage.KeyValueStore.ListItem<any, any>[] | undefined> {
		return undefined
	}
	async list(
		options?: storage.KeyValueStore.ListOptions
	): Promise<storage.Continuable<storage.KeyValueStore.ListItem<any, any>>> {
		return this.client.get(options ? `?${http.Search.stringify(options)}` : "")
	}
	static create(url: string, key?: string): Client {
		return new this(url, key)
	}
}
export namespace Client {}

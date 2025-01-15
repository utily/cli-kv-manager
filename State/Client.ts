import { http } from "cloudly-http"
import { storage } from "cloudly-storage"

export class Client {
	private readonly client: http.Client
	private constructor(url: string, key?: string) {
		this.client = new http.Client(url, key)
	}
	async append(
		data: storage.KeyValueStore.ListItem<any, any>[]
	): Promise<storage.KeyValueStore.ListItem<any, any>[] | undefined> {
		return this.client.patch("", data)
	}
	async list(
		options?: storage.KeyValueStore.ListOptions
	): Promise<storage.Continuable<storage.KeyValueStore.ListItem<any, any>> | undefined> {
		return this.client.get(options ? `?${http.Search.stringify(options)}` : "")
	}
	static create(url: string, authorization?: http.Authorization | string): Client {
		const result = new this(url, typeof authorization == "string" ? authorization : undefined)
		result.client.authorization = authorization
		return result
	}
}
export namespace Client {}

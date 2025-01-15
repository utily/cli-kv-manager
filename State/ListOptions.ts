import { storage } from "cloudly-storage"

export interface ListOptions {
	prefix?: string
	values?: boolean
	limit?: number
	all?: boolean
	cursor?: string
}

export namespace ListOptions {
	export function from(argument: (string | undefined)[]): ListOptions {
		const all = argument[2] == "all"
		return {
			prefix: argument[0] == "." ? "" : argument[0],
			values: argument[1] == "true",
			all,
			limit: all ? 500 : argument[2] ? Number.parseInt(argument[2]) : undefined,
			cursor: argument[3],
		}
	}
	export function to(options: ListOptions): storage.KeyValueStore.ListOptions {
		return {
			...(options.prefix ? { prefix: options.prefix } : {}),
			...(options.values ? { values: options.values } : {}),
			...(options.limit ? { limit: options.limit } : {}),
			...(options.cursor ? { cursor: options.cursor } : {}),
		}
	}
}

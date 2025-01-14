import { paramly } from "paramly"
import { State } from "../State"

export const list: paramly.Command<State> = {
	name: "list",
	description: "List data from storage.",
	examples: [
		["", "List items without loading values."],
		["prefix", "List items with prefix prefix without loading values."],
		["prefix true 10", "List 10 first items with prefix prefix including values."],
		["prefix false all", "List all items with prefix prefix without loading values."],
		[". false all", "List all items without loading values."],
	],
	async execute(state, argument, flags) {
		const prefix = argument[0] == "." ? "" : argument[0]
		const values = argument[1] == "true"
		const all = argument[2] == "all"
		const limit = all ? 500 : argument[2] ? Number.parseInt(argument[2]) : undefined
		let result: any | undefined
		let cursor: string | undefined
		do {
			result = await state?.client.list({
				prefix,
				values,
				limit,
				cursor,
			})
			if (result)
				console.log(JSON.stringify(result, undefined, "\t"))
			cursor = result?.cursor
		} while (all && result.cursor)
		if (result.cursor)
			console.info("cursor:", result.cursor)
		return !!result
	},
}

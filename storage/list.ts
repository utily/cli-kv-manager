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
		const result = await state?.list(State.ListOptions.from(argument))
		if (typeof result == "string")
			console.info("cursor:", result)
		return !!result
	},
}

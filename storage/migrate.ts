import { paramly } from "paramly"
import { State } from "../State"

export const migrate: paramly.Command<State> = {
	name: "migrate",
	description: "Migrate data to new storage.",
	examples: [
		[
			"https://example.com/kv user password prefix true",
			"Migrate all entries with prefix prefix including values to example.com.",
		],
	],
	async execute(state, argument, flags) {
		const client = State.Client.create(argument[0] ?? "https://example.com/kv", {
			user: argument[1] ?? "admin",
			password: argument[2],
		})
		const result = await state?.migrate(State.ListOptions.from(argument.slice(3)), client)
		if (typeof result == "string")
			console.info("cursor:", result)
		return !!result
	},
}

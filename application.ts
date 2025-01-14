import { paramly } from "paramly"
import * as data from "./package.json"
import { State } from "./State"

export const application = new paramly.Application<State>(
	"kv",
	"kv",
	data.version,
	[
		{
			short: "s",
			long: "server",
			arguments: 1,
			description: "Base url of backend.",
			usage: "https://example.com/kv",
		},
		{
			short: "k",
			long: "key",
			arguments: 1,
			description: "API key used for authentication with backend.",
			usage: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO",
		},
		{
			short: "u",
			long: "user",
			arguments: 1,
			description: "Username to use for Basic authentication.",
			usage: "joe",
		},
		{
			short: "p",
			long: "password",
			arguments: 1,
			description: "Password to use for Basic authentication.",
			usage: "secret",
		},
	],
	async flags => {
		const result = State.create((flags.server ?? flags.s)?.[0] ?? "https://example.com/kv", (flags.key ?? flags.k)?.[0])
		const user = (flags.user ?? flags.u)?.[0]
		if (user)
			result.client.authorization = { user, password: (flags.password ?? flags.p)?.[0] }
		return result
	}
)

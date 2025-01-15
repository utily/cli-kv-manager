import { application } from "../application"
import { list } from "./list"
import { migrate } from "./migrate"

application.register({ name: "storage", description: "Handle KV storage.", commands: { list, migrate } }, "storage")

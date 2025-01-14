import { application } from "../application"
import { list } from "./list"

application.register({ name: "storage", description: "Handle KV storage.", commands: { list } }, "storage")

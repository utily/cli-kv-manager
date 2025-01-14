#!/usr/bin/env node
import "./storage"
import { application } from "./application"

application.run(process.argv).then(result => process.exit(result ? 0 : 1))

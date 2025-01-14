import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

export default {
	input: "index.ts",
	output: {
		file: "dist/index.js",
		format: "cjs",
		sourcemap: true,
	},
	plugins: [json(), typescript({ tsconfig: "./tsconfig.mjs.json" }), resolve()],
}

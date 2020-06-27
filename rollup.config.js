import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

/** @type import("rollup").RollupOptions */
const options = {
  input: "./src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    compact: true,
  },
  plugins: [typescript(), terser({ mangle: true })],
}

export default options
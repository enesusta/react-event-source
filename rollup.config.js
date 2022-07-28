import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      declaration: true,
    }),
    terser(),
  ],
  external: ["react"],
};

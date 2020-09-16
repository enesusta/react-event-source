import external from 'rollup-plugin-peer-deps-external'
import nodeResolve from '@rollup/plugin-node-resolve'
import {terser} from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output:
    {
      file: pkg.module,
      format: 'es',
    },
  plugins: [
    external(),
    nodeResolve({jsnext: true, preferBuiltins: true, browser: true}),
    commonjs(),
    terser()
  ],
  external: ['rxjs', 'rxjs/operators']
}


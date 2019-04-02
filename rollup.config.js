import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import { version } from './package.json';
import replace from 'rollup-plugin-replace';

const copyright = new Date().getFullYear() > 2018 ? '2018-' + new Date().getFullYear() : 2018;

const banner =
  '/*!\n' +
  ' * Dots and Line Connect v' + version + '\n' +
  ' * (c) ' + copyright + ' NW\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const baseOutput = {
  banner: banner
  // sourcemap: true
}

const formatList = ['amd', 'cjs', 'es', 'iife', 'umd']
// const formatList = ['amd', 'cjs', 'iife']
// const formatList = ['es']

function getOutputs () {
  let arr = []
  for (let i of formatList) {
    let item = {
      file: 'dist/bundle.' + i + '.js',
      format: i,
      name: 'pointPlot',
    }
    arr.push(Object.assign(item, baseOutput))
  }
  return arr
}

const config = {
  input: 'src/index.js',
  output: getOutputs(),
  plugins: [
    json(),
    replace({
      __VERSION__: version
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      // include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    // uglify()
  ],
  watch: {
    exclude: 'node_modules/**'
  }
}
export default config

import dotenv from 'dotenv';
dotenv.config();

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const root = '..';
const dist = `${root}/dist`;

const {
    NODE_ENV:ENV = 'development'
} = process.env;

const PROD = ENV === 'production';

export default cli => {
    return {
        treeshake:true,
        input:`${root}/index.js`,
        output:[
            {
                file:`${dist}/bundle.js`,
                format:'iife',
                sourcemap:!PROD,
                freeze:false,
                compact:true
            }
        ],
        plugins:[
            html(),
            eslint({ include:'**/*.js' }),
            commonjs({ include:'node_modules/**' }),
            babel({
                configFile:'etc/.babelrc.js',
                exclude:'node_modules/**',
                babelHelpers:'bundled'
            }),
            resolve({ browser:true }),
            !PROD && serve({
                host:'0.0.0.0',
                contentBase:[dist],
                historyApiFallback:true
            }),
            !PROD && livereload(dist)
        ],
        watch:!PROD && {
            clearScreen:false
        }
    };
};
import { createVariants } from 'parallel-webpack';
import path from 'path';
import packageJson from './package.json'
import webpackConfiguration from './webpackConf';

var baseOptions = {
  devTool: process.env.DEVTOOL || 'source-map',
  paths: {
    dist: path.resolve(__dirname, 'dist'),
  },
  name: packageJson.name,
  version: packageJson.version,
};

export default (env, argv) => console.log(env, argv) || webpackConfiguration({
  mode: 'development',
  ...baseOptions,
  ...env,
  ...argv,
});

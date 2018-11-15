import { createVariants } from 'parallel-webpack';
import path from 'path';
import packageJson from './package.json'
import webpackConfiguration from './webpackConf';

var variants = {
  mode: ['development', 'production'],
};

var baseOptions = {
  devTool: process.env.DEVTOOL || 'source-map',
  paths: {
    dist: path.resolve(__dirname, 'dist'),
  },
  name: packageJson.name,
  version: packageJson.version,
};

const createConfig = (options) => webpackConfiguration(options);

export default createVariants(baseOptions, variants, createConfig);

import { createVariants } from 'parallel-webpack';
import webpackConfiguration from './webpackConf';
import path from 'path';

var variants = {
  mode: ['development', 'production'],
};

const createConfig = (options) => webpackConfiguration((options));

export default createVariants({}, variants, createConfig);

import { createVariants } from 'parallel-webpack';
import webpackConfiguration from './setup';

var variants = {
  mode: ['production'],
};

const createConfig = (options) => webpackConfiguration((options));

export default createVariants({}, variants, createConfig);

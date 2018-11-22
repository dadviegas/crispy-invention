import { createVariants } from 'parallel-webpack';
import webpackConfiguration from './setup';
import params from './setup/params';

var variants = {
  mode: ['production'],
};

const createConfig = (options) => webpackConfiguration((options));

export default createVariants({ ...params }, variants, createConfig);

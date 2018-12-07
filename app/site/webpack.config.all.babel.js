import { createVariants } from 'parallel-webpack';
import webpackConfiguration from '@dadv/webpack-conf';
import params from './setup/params';

var variants = {
  mode: ['production', 'test'],
};

const createConfig = (options) => console.log(options) || webpackConfiguration((options));

export default (env, argv) => createVariants({
  ...params(env, argv),
  ...env,
  ...argv,
}, variants, createConfig);
// not working
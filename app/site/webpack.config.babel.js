import { createVariants } from 'parallel-webpack';
import webpackConfiguration from './webpackConf';

export default (env, argv) => console.log(env, argv) || webpackConfiguration({
  mode: 'development',
  ...env,
  ...argv,
});

import webpackConfiguration from '@asgard/webpack-conf';
import params from './setup/params';

export default (env, argv) => console.log(env, argv) ||
  webpackConfiguration({
    ...params(env, argv),
    ...env,
    ...argv,
  });

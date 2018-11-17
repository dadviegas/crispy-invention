import webpackConfiguration from './setup';

export default (env, argv) => webpackConfiguration({
  mode: 'development',
  ...env,
  ...argv,
});

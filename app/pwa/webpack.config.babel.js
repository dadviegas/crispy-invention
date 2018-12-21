import bundleConfiguration from '@asgard/bundle-app';
import params from './setup';

export default (env, args) => bundleConfiguration(params({ env, args }));

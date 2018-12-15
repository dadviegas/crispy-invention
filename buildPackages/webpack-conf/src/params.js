const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const defineVariables = (options) => ({
  ENV: JSON.stringify(options.mode || DEVELOPMENT),
  DEBUG: options.mode !== PRODUCTION,
});

export default (confOptions = {}, global = {}) => ({
  global: {
    ...defineVariables(confOptions),
    ...confOptions.global,
    ...global,
  },
});
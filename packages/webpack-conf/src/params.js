import path from 'path';
import packageJson from '../package.json'

const getFolder = (folder = '') => path.resolve(process.cwd(), folder);

const getSiteName = (config) => `${config.description} ${config.mode !== 'production' ? `- ${config.mode}` : ''}`

export default (confOptions = {}, global = {}) => ({
  devTool: process.env.DEVTOOL || 'source-map',
  paths: {
    dist: getFolder('dist'),
    styles: getFolder('styles'),
    htmlTemplate: getFolder('assets/index.html'),
  },
  name: confOptions.name,
  version: confOptions.version,
  html: {
    title: getSiteName(confOptions) || 'App',
  },
  ...confOptions,
  global: {
    ...global,
    ...confOptions.global,
  },
});
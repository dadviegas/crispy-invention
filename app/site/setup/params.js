import path from 'path';
import packageJson from '../package.json'

const getSiteName = (mode = '') => `${packageJson.description} ${mode !== 'production' ? `- ${mode}` : ''}`

export default (confOptions = {}) => ({
  devTool: process.env.DEVTOOL || 'source-map',
  paths: {
    dist: path.resolve(__dirname, '..', 'dist'),
  },
  name: packageJson.name,
  version: packageJson.version,
  html: {
    title: getSiteName(confOptions.mode),
  },
  ...confOptions,
});
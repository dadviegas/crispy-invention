import yaml from 'js-yaml';
import fs from 'fs';
import deepmerge from 'deepmerge';

export default (yamlFile, environment = 'production') => {
  var result = yaml.safeLoad(fs.readFileSync(yamlFile, 'utf8'));

  const defaultData = result['default'] || {};
  const environmentData = result[environment] || {};

  return deepmerge(defaultData, environmentData);
}

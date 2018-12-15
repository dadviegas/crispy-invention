import yaml from 'js-yaml';
import fs from 'fs';
import deepmerge from 'deepmerge';

export default (yamlFile, environment = 'production', transformOptions = []) => {
  const rawYaml = fs.readFileSync(yamlFile, 'utf8');
  let transformedYmal = rawYaml;

  transformOptions.forEach((pair) => {
    transformedYmal = transformedYmal.replace(pair.key, pair.value);
  });

  var result = yaml.safeLoad(transformedYmal);

  const defaultData = result['default'] || {};
  const environmentData = result[environment] || {};

  return deepmerge(defaultData, environmentData);
}

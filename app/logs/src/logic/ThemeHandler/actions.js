import { actionsObjectCreator } from '@asgard/redux-helpers';

const prefix = 'theme-handler/';

const rawConstants = [
 { name: 'SET_THEME', functionName: 'setTheme',  prefix, callback: (name) => ({name}) },
];

const data = actionsObjectCreator(rawConstants);
export const actions = data.actions;
export const constants = data.constants;
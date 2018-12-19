import { actionsObjectCreator } from '@asgard/redux-helpers';

const prefix = 'keyboard-handler/';

const rawConstants = [
  { name: 'CLEAR_KEY', functionName: 'clearKey', prefix },
  { name: 'KEY_PRESSED', functionName: 'keypressed', prefix },
  { name: 'KEY_RELEASED', functionName: 'keyReleased', prefix },
];

const data = actionsObjectCreator(rawConstants);
export const actions = data.actions;
export const constants = data.constants;

export const DIRECTION_KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

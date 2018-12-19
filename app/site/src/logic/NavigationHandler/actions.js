import { actionsObjectCreator } from '@asgard/redux-helpers';

const prefix = 'navigation-handler/';

const rawConstants = [
  { name: 'SELECTED_AREA', functionName: 'selectedArea', prefix },
  { name: 'SET_VERTICAL_INDEX', functionName: 'setVerticalIndex', prefix },
  { name: 'SET_HORIZONTAL_INDEX', functionName: 'setHorizontalIndex', prefix },
];

const data = actionsObjectCreator(rawConstants);

export const actions = data.actions;
export const constants = data.constants;

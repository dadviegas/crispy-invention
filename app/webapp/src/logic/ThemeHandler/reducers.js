import { Map } from 'immutable';

import { constants } from './actions';

const initialState = Map({
  name: 'Indigo',
});

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case constants.SET_THEME: {
      return state.merge(payload);
    }
    default:
      return state;
  }
}

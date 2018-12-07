import { constants } from './actions';
import { Map } from 'immutable';

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
};

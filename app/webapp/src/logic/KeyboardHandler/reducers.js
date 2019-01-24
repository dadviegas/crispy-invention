import { Map } from 'immutable';
import { constants } from './actions';

const initialState = Map({ times: 0 });

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case constants.KEY_PRESSED: {
      return state.merge({
        ...payload,
        times: state.get('times') + 1,
      });
    }
    case constants.CLEAR_KEY: {
      return initialState;
    }
    default:
      return state;
  }
}

import { fromJS } from 'immutable';

import { constants as navigationConstants, DIRECTION_KEYS } from '../KeyboardHandler';

const NAVIGATION_TYPE = {
  RAIL: 'RAIL',
  GRID: 'GRID',
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
  NONE: 'NONE',
};

const initialState = fromJS({
  selectedItem: {},
  selectedArea: {},
  navigationType: NAVIGATION_TYPE.NONE,
  position: {
    x: 0,
    y: 0,
  },
  virtualContainer: {
    horizontalVisibleElements: 5,
    verticalVisibleElements: 2,
  },
  pagination: {
    start: 0,
    end: 0,
    totalSize: 0,
    pageSize: 0,
  },
  context: {},
});

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case navigationConstants.KEY_PRESSED: {
      let xOffset = 0;
      let yOffset = 0;

      const position = {
        x: state.getIn(['position', 'x']),
        y: state.getIn(['position', 'y']),
      };

      switch (payload.keyCode) {
        case DIRECTION_KEYS.UP: {
          if (position.y) {
            yOffset = -1;
          }
          break;
        }
        case DIRECTION_KEYS.DOWN: {
          yOffset = 1;
          break;
        }
        case DIRECTION_KEYS.LEFT: {
          if (position.x) {
            xOffset = -1;
          }
          break;
        }
        case DIRECTION_KEYS.RIGHT: {
          xOffset = 1;
          break;
        }
        default:
      }

      return state.merge({
        position: {
          x: position.x + xOffset,
          y: position.y + yOffset,
        },
      });
    }
    default:
      return state;
  }
}

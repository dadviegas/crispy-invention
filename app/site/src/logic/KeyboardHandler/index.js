import { logicCreator } from '@dadv/asgard-redux-helpers';

import keyboardNavigation from './reducers';
import saga from './sagas';

export default logicCreator({
  reducers: { keyboardNavigation },
  sagas: [saga]
});

export * from './actions';
export * from './selectors';

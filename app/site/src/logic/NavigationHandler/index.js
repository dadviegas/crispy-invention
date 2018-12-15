import { logicCreator } from '@asgard/redux-helpers';
import navigation from './reducers';
import saga from './sagas';

export default logicCreator({
  reducers: { navigation },
  sagas: [saga]
});

export * from './actions';
export * from './selectors';

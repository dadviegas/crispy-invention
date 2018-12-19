import { logicCreator } from '@asgard/redux-helpers';
import theme from './reducers';

export default logicCreator({
  reducers: { theme },
});

export * from './actions';
export * from './selectors';

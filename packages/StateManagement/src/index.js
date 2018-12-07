import { createStore, applyMiddleware } from 'redux';
import {
  combineReducers
} from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import {
  routerReducer,
  routerMiddleware,
} from "react-router-redux";


// Create a history of your choosing (we're using a browser history in this case)

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const flatten = (arr = []) => arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

const composeEnhancers = composeWithDevTools({
  serialize: false,
  maxAge: 140,
  features: {
    pause: true,
    lock: false,
    persist: false,
    export: true,
    import: 'custom',
    jump: false,
    skip: false,
    reorder: false,
    dispatch: true,
    test: false,
  },
});

const storeInit = (elements = []) => {
  const storeOptions = {
    reducers: {},
    sagas: [],
    middlewares: [],
  };

  elements.forEach(element => {
    storeOptions.reducers = {
      ...storeOptions.reducers,
      ...element.reducers,
      router: routerReducer
    };

    storeOptions.sagas = storeOptions.sagas.concat(element.sagas);
    storeOptions.middlewares = storeOptions.middlewares.concat(element.middlewares, middleware);
  });

  return storeOptions;
}

export default (elements) => {
  const { reducers, sagas = [], middlewares = []} = storeInit(elements);

  const sagaMiddleware = reduxSaga({
    onError: (error) => console.error(error),
  });

  const store = createStore(
    combineReducers(
      reducers
    ),
    composeEnhancers(
      applyMiddleware(...middlewares, sagaMiddleware)
    )
  );

  sagaMiddleware.run(function* rootSaga() {
    const flattenSagas = flatten(sagas);

    if (flattenSagas.length) {
      yield all(flattenSagas.map(fork));
    }
  });

  return store;
};


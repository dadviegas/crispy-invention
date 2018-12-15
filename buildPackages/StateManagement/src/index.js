import { createStore, applyMiddleware } from 'redux';
import {
  combineReducers
} from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, routerMiddleware } from 'connected-react-router'

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
    middlewares: [routerMiddleware(history)],
  };

  elements.forEach(element => {
    storeOptions.reducers = {
      ...storeOptions.reducers,
      ...element.reducers,
      router: connectRouter(history)
    };

    storeOptions.sagas = storeOptions.sagas.concat(element.sagas);
    storeOptions.middlewares = storeOptions.middlewares.concat(element.middlewares);
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


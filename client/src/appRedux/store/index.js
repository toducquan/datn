import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from '../reducers'
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';

const createBrowserHistory = require('history').createBrowserHistory;
export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, routeMiddleware, sagaMiddleware];

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      ),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise'
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const debugware = [];
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger');
  debugware.push(createLogger({
    collapsed: true
  }));
}

export default function configureStore(initialState) {
  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   window.devToolsExtension ? window.devToolsExtension() : undefined
  // );
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history), promise, ...debugware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

import HP from './helpers';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { App } from './modules/test/test-components.jsx';
import { testReducer } from './modules/test/test-reducer';

let store = createStore(
  testReducer,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
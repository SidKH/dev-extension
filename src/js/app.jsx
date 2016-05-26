import HP from './helpers';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Viewer } from './modules/viewer/viewer-component.jsx';
import { ViewerReducer } from './modules/viewer/viewer-reducer';

window.store = createStore(
  ViewerReducer,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <Viewer />
  </Provider>,
  document.getElementById('root')
);
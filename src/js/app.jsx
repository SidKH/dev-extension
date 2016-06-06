import HP from './helpers';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Viewer } from './modules/viewer/viewer-component.jsx';
import { ViewerReducer } from './modules/viewer/viewer-reducer';

/**
 * Function that destroy previous app (if it exists)
 *  and starting new one
 */
window.startApp = function (domain) {
  
  // Create store
  window.store = createStore(
    ViewerReducer,
    applyMiddleware(thunk)
  );
  
  // Remove previous application
  $('#root').html('');
  
  // Render new one
  render(
    <Provider store={window.store}>
      <Viewer />
    </Provider>,
    document.getElementById('root')
  );
}

// If app is running OUTSIDE the devtools
if (!chrome.devtools) { window.startApp(window.location.origin); }
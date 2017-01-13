import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { browserHistory, Router } from 'react-router';

import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/src/styles/index.css';

import routes from './routing/routes';
import rootReducer from './reducers/rootReducer';
import storeInit from './store/storeInit';

// Store initialization

// DEBUG :: LOGGER
/* import createLogger from 'redux-logger';
const logger = createLogger() */

const store = createStore(rootReducer, storeInit, applyMiddleware(thunk));

// Render

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ browserHistory } routes={ routes } />
      <ReduxToastr />
    </div>
  </Provider>,
  document.getElementById('root')
);

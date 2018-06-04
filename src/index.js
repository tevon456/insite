import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import {
  createStore
} from 'redux'



import {
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_ERROR
} from './types/graph';



import rootReducer from './reducers/rootReducer.js';
import App from "./App.js";
import "./styles.css";


const store = createStore(
  rootReducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
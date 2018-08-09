import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store/configureStore.js';

import rootReducer from 'reducers/rootReducer.js';
import App from "./App.js";
import "./styles.css";


if (module.hot) {
  module.hot.accept();

}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

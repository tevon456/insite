import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/rootReducer.js';


const middlewareEnhancer = applyMiddleware(thunk, createLogger());
const enhancers = [middlewareEnhancer];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export{store}

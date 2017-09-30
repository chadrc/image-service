
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers'
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(middleware))
);

let info = {
    store: store,
    history: history
};

export default info;
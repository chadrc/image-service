import React from 'react'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers'

import App from './App';

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

const Main = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/" component={App} />
            </div>
        </ConnectedRouter>
    </Provider>
);

export default Main;
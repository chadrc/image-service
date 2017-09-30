import React from 'react'

import { Provider } from 'react-redux'

import { Route } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'

import App from './App';

import Store from './Store';

const Main = () => (
    <Provider store={Store.store}>
        <ConnectedRouter history={Store.history}>
            <div>
                <Route path="/" component={App} />
            </div>
        </ConnectedRouter>
    </Provider>
);

export default Main;
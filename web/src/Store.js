
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import reducers from './reducers'

const history = createHistory();
const store = createStore(
    combineReducers({
        ...reducers.reducers,
        form: formReducer,
        router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(
        routerMiddleware(history),
        createEpicMiddleware(combineEpics(...reducers.epics)))
    )
);

let info = {
    store: store,
    history: history
};

export default info;
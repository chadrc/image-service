
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import reducers from './reducers'

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    combineReducers({
        ...reducers,
        form: formReducer,
        router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(middleware))
);

let info = {
    store: store,
    history: history
};

export default info;
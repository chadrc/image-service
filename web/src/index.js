import React from 'react';
import ReactDOM from 'react-dom';
import * as j from 'jquery';
import * as t from 'tether';
import registerServiceWorker from './registerServiceWorker';

window.jQuery = j;
window.Tether = t;

import("./App").then(App => {
    let AppComp = App.default;
    ReactDOM.render(<AppComp />, document.getElementById('root'));
    registerServiceWorker();
});



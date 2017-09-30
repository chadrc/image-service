import React from 'react';
import ReactDOM from 'react-dom';
import * as j from 'jquery';
import * as t from 'tether';
import registerServiceWorker from './registerServiceWorker';

window.jQuery = j;
window.Tether = t;

import("./Main").then(Package => {
    let Comp = Package.default;
    ReactDOM.render(<Comp />, document.getElementById('root'));
    registerServiceWorker();
});



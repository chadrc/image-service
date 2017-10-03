import React from 'react';
import ReactDOM from 'react-dom';
import * as j from 'jquery';
import * as t from 'tether';
import * as p from 'popper.js';
import registerServiceWorker from './registerServiceWorker';

window.jQuery = j;
window.Tether = t;
window.Popper = p;

import("./Main").then(Package => {
    let Comp = Package.default;
    ReactDOM.render(<Comp />, document.getElementById('root'));
    registerServiceWorker();
});



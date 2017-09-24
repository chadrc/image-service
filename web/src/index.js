import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'whatwg-fetch';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// IMPORT REACT //
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';

// COMPONENTS //
import App from './components/app';

render((
    <BrowserRouter history={browserHistory}>
        <App />
    </BrowserRouter>
), document.getElementById('app'));

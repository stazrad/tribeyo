// packages
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'

// store
import configureStore from './store/configureStore'
const store = configureStore()

// components
import App from './components/app'

const reactApp = (
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
            <App />
        </BrowserRouter>
    </Provider>
)

render(reactApp, document.getElementById('app'))

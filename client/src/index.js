// packages
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

// store
import configureStore from 'store/configureStore'
const store = configureStore()

// imports
import App from 'components/app'
import theme from './theme'

const reactApp = (
	<Provider store={store}>
		<BrowserRouter history={browserHistory}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</Provider>
)

render(reactApp, document.getElementById('app'))

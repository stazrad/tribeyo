// packages
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

// imports
import search from 'reducers/search'
import user from 'reducers/user'

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose() //TODO remove devtools in production env

export default () =>
	createStore(
		combineReducers({
			search,
			user
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

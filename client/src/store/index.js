// packages
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

// imports
import areaCodeSearch from 'reducers/areaCodeSearch'
import inmateSearch from 'reducers/InmateSearch'
import user from 'reducers/user'

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose() //TODO remove devtools in production env

export default () =>
	createStore(
		combineReducers({
			areaCodeSearch,
			inmateSearch,
			user
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

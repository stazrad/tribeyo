// packages
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

// imports
import views from 'reducers/views'
import search from 'reducers/search'
import user from 'reducers/user'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose() // FIXME remove devtools in production env

export default () =>
  createStore(
    combineReducers({
      search,
      user,
      views
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

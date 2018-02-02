// PACKAGES //
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// REDUCERS //
import viewsReducer from 'reducers/views'
import searchReducer from 'reducers/search'
import userReducer from 'reducers/user'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose()

export default () => {
    const store = createStore(
        combineReducers({
            views: viewsReducer,
            search: searchReducer,
            user: userReducer
        }), composeEnhancers(applyMiddleware(thunk))
    )
    return store
}

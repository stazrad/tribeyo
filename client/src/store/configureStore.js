// PACKAGES //
import { createStore, combineReducers } from 'redux'

// REDUCERS //
import userReducer from '../reducers/user'

export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer
        })
    )

    return store
}

const userReducerDefaultState = {
    isLoggedIn: false,
    error: false,
    name: '',
    email: '',
    emailVerified: false,
    twilio: {
        accountSid: '',
        authToken: '',
        number: {
            areaCode: '',
            forwardToNumber: {
                displayNumber: '',
                number: ''
            },
            purchasedNumber: {
                displayNumber: '',
                number: ''
            }
        }
    },
    stripe: {
        id: '',
        subscription: ''
    },
    uid: ''
}

const userReducer = (state = userReducerDefaultState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.user,
                isLoggedIn: true,
                error: false
            }
        case 'LOGIN_ERROR':
            return {
                isLoggedIn: false,
                error: action.error
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                error: false
            }
        case 'SIGNUP_ERROR':
            return {
                isLoggedIn: false,
                error: action.error
            }
        default:
            return state
    }
}

export default userReducer

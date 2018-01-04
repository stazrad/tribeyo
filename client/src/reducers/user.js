const userReducerDefaultState = {
    isLoggedIn: false,
    user: {
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
}
const userReducer = (state = userReducerDefaultState, action) => {
    switch(action.type) {
        case 'LOGIN':
            console.log('action', action)
            return {
                isLoggedIn: true,
                user: {
                    ...action.user
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                text: action.filter
            }
        case 'SIGNUP':
            return {
                ...state,
                startDate: action.startDate
            }
        default:
            return state
    }
}

export default userReducer

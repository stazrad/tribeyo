const defaultState = {
	isLoggedIn: false,
	error: false,
	name: '',
	email: '',
	emailVerified: false,
	twilio: {
		number: {
			area: {
				code: '',
				display: ''
			},
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
		subscription: ''
	},
	uid: ''
}

const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'LOGIN':
		console.log('login')
			return {
				...state,
				...action.user,
				isLoggedIn: true,
				error: false
			}
		case 'LOGIN_ERROR':
			return {
				...state,
				isLoggedIn: false,
				error: action.error // FIXME need forced typing here (boolean -> string?)
			}
		case 'LOGOUT':
			return {
				...state,
				isLoggedIn: false,
				error: false
			}
		case 'SIGNUP_ERROR':
			return {
				...state,
				isLoggedIn: false,
				error: action.error
			}
		default:
			return state
	}
}

export default userReducer

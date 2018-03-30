// packages
import fetch from 'isomorphic-fetch'

const login = user => ({
	type: 'LOGIN',
	user
})

const loginError = error => ({
	type: 'LOGIN_ERROR',
	error
})

const signupError = error => ({
	type: 'SIGNUP_ERROR',
	error
})

export const userLogin = formData => dispatch => {
	const init = {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(formData)
	}
	fetch('/api/profile/login', init)
		.then(res => res.json())
		.then(res => {
			if (res.status != 200) {
				const msg = res.msg.toLowerCase()
				const error = {}

				if (msg.includes('email')) {
					error.type = 'email'
					error.msg = res.msg
				} else if (msg.includes('password')) {
					error.type = 'password'
					error.msg = 'This password is invalid'
				} else {
					error.type = 'server'
					error.msg = res.msg
				}

				return dispatch(loginError(error))
			} else {
				return dispatch(login(res.user))
			}
		})
		.catch(err => {
			const error = {
				type: 'server',
				msg: 'Oops! Something went wrong...try again.'
			}
			return dispatch(loginError(error))
		})
}

export const userSignup = formData => dispatch => {
	const init = {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(formData)
	}
	fetch('/api/profile', init)
		.then(res => res.json())
		.then(res => {
			if (res.status != 200) {
				const msg = res.msg.toLowerCase()
				const error = {}

				if (msg.includes('email')) {
					error.type = 'email'
					error.msg = res.msg
				} else if (msg.includes('password')) {
					error.type = 'password'
					error.msg = res.msg
				} else {
					error.type = 'server'
					error.msg = res.msg
				}

				return dispatch(signupError(error))
			} else {
				return dispatch(login(res.user))
			}
		})
		.catch(err => {
			const error = {
				type: 'server',
				msg: 'Oops! Something went wrong...try again.'
			}
			return dispatch(signupError(error))
		})
}

// PACKAGES //
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

export const userLogin = formData => {
    return (dispatch) => {
        fetch('/api/profile/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if(result.status != 200) {
                let msg = result.message.toLowerCase()
                let error = {}
                if(msg.includes('email')) {
                    error.type = 'email'
                    error.message = result.message
                } else if(msg.includes('password')) {
                    error.type = 'password'
                    error.message = 'This password is invalid'
                } else {
                    error.type = 'server'
                    error.message = result.message
                }

                return dispatch(loginError(error))
            } else {
                return dispatch(login(result.user))
            }
        })
        .catch((err) => {
            let error = {
                type: 'server',
                message: 'Oops! Something went wrong...try again.'
            }
            return dispatch(loginError(error))
        })
    }
}

export const userSignup = formData => {
    return (dispatch) => {
        fetch('/api/profile', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if(result.status != 200) {
                let msg = result.message.toLowerCase()
                let error = {}
                if(msg.includes('email')) {
                    error.type = 'email'
                    error.message = result.message
                } else if(msg.includes('password')) {
                    error.type = 'password'
                    error.message = result.message
                } else {
                    error.type = 'server'
                    error.message = result.message
                }

                return dispatch(signupError(error))
            } else {
                return dispatch(login(result.user))
            }
        })
        .catch((err) => {
            let error = {
                type: 'server',
                message: 'Oops! Something went wrong...try again.'
            }
            return dispatch(signupError(error))
        })
    }
}

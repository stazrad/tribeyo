// PACKAGES //
import fetch from 'isomorphic-fetch'

export const login = user => ({
    type: 'LOGIN',
    user: user
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
            console.log('result',result)
            dispatch(login(result.user))    
        })
        .catch((err) => {
            console.log('ERROR',err)
        })
    }
}

// PACKAGES //
import fetch from 'isomorphic-fetch'

export const autocomplete = input => {
    return (dispatch) => {
        const init = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`/api/autocomplete/${input}`, init)
            .then(response => response.json())
            .then(predictions => {
                return dispatch({
                    type: 'AUTOCOMPLETE',
                    predictions
                })
            })
            .catch(err => {
                const error = {
                    type: 'server',
                    message: 'Oops! Something went wrong...try again.'
                }
                console.log(err)
            })
    }
}

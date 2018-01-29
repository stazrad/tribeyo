// PACKAGES //
import fetch from 'isomorphic-fetch'

export const autocomplete = input => {
    // return empty predictions array if input is blank
    if(!input) {
        return(dispatch) => dispatch({
            type: 'AUTOCOMPLETE',
            predictions: []
        })
    }
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

export const searchByCity = input => {
    return (dispatch) => {
        const init = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`/api/searchByCity/${input}`, init)
            .then(response => response.json())
            .then(areaCode => {
                return dispatch({
                    type: 'SEARCH_BY_CITY',
                    areaCode
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

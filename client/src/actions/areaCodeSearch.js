import fetch from 'isomorphic-fetch'

export const autocomplete = input => {
	// return empty predictions array if input is blank
	if (!input) {
		return dispatch =>
			dispatch({
				type: 'AUTOCOMPLETE',
				predictions: []
			})
	}
	return dispatch => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'same-origin',
			credentials: 'include'
		}
		fetch(`/api/autocomplete/${input}`, config)
			.then(res => res.json())
			.then(predictions => {
				return dispatch({
					type: 'AUTOCOMPLETE',
					predictions: predictions.map(str =>
						str.replace(', United States', '')
					)
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

export const searchByCity = input => dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'same-origin',
		credentials: 'include'
	}
	fetch(`/api/searchByCity/${input}`, config)
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
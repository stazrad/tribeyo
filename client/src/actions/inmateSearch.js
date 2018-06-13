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

export const searchByInmate = name => dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'same-origin',
		credentials: 'include'
	}
	fetch(`/api/searchByInmate?nameFirst=${name.first}&nameLast=${name.last}`, config)
		.then(response => response.json())
		.then(results => {
			console.log(results)
			return dispatch({
				type: 'INMATE_RESULTS',
				results
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

export const searchByFaclCode = faclCode => dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'same-origin',
		credentials: 'include'
	}
	fetch(`/api/searchByFaclCode/${faclCode}`, config)
		.then(response => response.json())
		.then(facility => {
			return dispatch({
				type: 'FACILITY_RESULT',
				facility
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

export const defaultState = {
	inmate: {
		nameFirst: '',
		nameLast: '',
		nameMiddle: '',
		sex: '',
		race: '',
		age: '',
		inmateNum: '',
		inmateNumType: '',
		releaseCode: '',
		faclCode: '',
		faclName: '',
		faclType: ''
	},
	predictions: []
}

const searchReducer = (state = defaultState, { inmate, predictions, type }) => {
	switch (type) {
		case 'AUTOCOMPLETE':
			return {
				...state,
				predictions
			}
		case 'SEARCH_BY_INMATE':
			return {
				...state,
				inmate
			}
		default:
			return state
	}
}

export default searchReducer

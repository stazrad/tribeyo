export const defaultState = {
	areaCode: {
		code: '',
		display: ''
	},
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

const searchReducer = (state = defaultState, { areaCode, predictions, type }) => {
	switch (type) {
		case 'AUTOCOMPLETE':
			return {
				...state,
				predictions
			}
		case 'SEARCH_BY_CITY':
			return {
				...state,
				areaCode
			}
		default:
			return state
	}
}

export default searchReducer

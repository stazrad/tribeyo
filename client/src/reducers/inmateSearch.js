export const defaultState = {
	facility: {},
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
	results: []
}

const searchReducer = (state = defaultState, { facility, inmate, results, type }) => {
	switch (type) {
		case 'FACILITY_RESULT':
			return {
				...state,
				facility
			}
		case 'INMATE_RESULTS':
			return {
				...state,
				results
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

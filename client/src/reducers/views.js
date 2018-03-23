const defaultState = {
	checkout: false,
	search: false
}

const viewsReducer = (state = defaultState, { checkout, search, type }) => {
	switch (type) {
		case 'CHECKOUT_VIEW':
			return {
				...state,
				checkout
			}
		case 'SEARCH_VIEW':
			return {
				...state,
				search
			}
		default:
			return state
	}
}

export default viewsReducer

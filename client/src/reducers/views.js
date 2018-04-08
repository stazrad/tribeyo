const defaultState = {
	checkout: false,
	search: false
}

const viewsReducer = (state = defaultState, { checkout, search, type }) => {
	switch (type) {
		case 'CHECKOUT_VIEW':
			return {
				...defaultState,
				checkout
			}
		case 'SEARCH_VIEW':
			return {
				...defaultState,
				search
			}
		default:
			return state
	}
}

export default viewsReducer

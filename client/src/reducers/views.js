const viewsReducerDefaultState = {
    checkout: false,
    search: false
}

const viewsReducer = (state = viewsReducerDefaultState, { checkout, search, type }) => {
    switch(type) {
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

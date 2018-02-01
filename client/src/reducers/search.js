const searchReducerDefaultState = {
    areaCode: {
        code: '',
        display: ''
    },
    predictions: []
}

const searchReducer = (state = searchReducerDefaultState, { areaCode, predictions, type }) => {
    switch(type) {
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

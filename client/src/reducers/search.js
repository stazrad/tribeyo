const searchReducerDefaultState = {
    predictions: []
}

const searchReducer = (state = searchReducerDefaultState, { predictions, type }) => {
    switch(type) {
        case 'AUTOCOMPLETE':
            return {
                ...state,
                predictions
            }
        default:
            return state
    }
}

export default searchReducer

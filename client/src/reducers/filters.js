const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.filter
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.sortBy
            }
        default:
            return state
    }
}

export default filtersReducer

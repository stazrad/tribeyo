import searchReducer, { defaultState } from 'reducers/search'
import { autocomplete } from 'actions/search'
import store from 'store'

describe('search reducer', () => {
    it('should return empty predictions array', () => {
        // test empty input
        store().dispatch(autocomplete())

        const { predictions } = store().getState().search

        expect(predictions).toEqual([])
    })

    it('should return autocomplete predictions', () => {
        const predictions = [
            'you have my sword',
            'and my bow',
            'and my axe'
        ]
        const action = {
            type: 'AUTOCOMPLETE',
            predictions
        }
        const result = searchReducer(defaultState, action)

        expect(result).toMatchSnapshot()
    })

    it('should return area code object', () => {
        const areaCode = {
            code: '615',
            display: '(615)'
        }
        const action = {
            type: 'SEARCH_BY_CITY',
            areaCode
        }
        const result = searchReducer(defaultState, action)

        expect(result).toMatchSnapshot()
    })
})

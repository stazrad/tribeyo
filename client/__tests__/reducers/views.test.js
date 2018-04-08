const views = require('reducers/views')
const { checkoutView, searchView } = require('actions/views')

describe('views reducer', () => {
    it('should set view to checkout', () => {
        const store = require('store').default()

        store.dispatch(checkoutView())

        const { checkout } = store.getState().views
        const { search } = store.getState().views

        expect(checkout).toBe(true)
        expect(search).toBe(false)
    })

    it('should set view to search', () => {
        const store = require('store').default()

        store.dispatch(searchView())

        const { checkout } = store.getState().views
        const { search } = store.getState().views

        expect(checkout).toBe(false)
        expect(search).toBe(true)
    })
})

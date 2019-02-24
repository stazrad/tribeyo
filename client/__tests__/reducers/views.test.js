import { checkoutView, searchView } from 'actions/views'
import configureStore from 'store'
const store = configureStore()

describe('views reducer', () => {
    it('should set view to checkout', () => {
        store.dispatch(checkoutView())

        const { checkout, search } = store.getState().views

        expect(checkout).toBe(true)
        expect(search).toBe(false)
    })

    it('should set view to search', () => {
        store.dispatch(searchView())

        const { checkout, search } = store.getState().views

        expect(checkout).toBe(false)
        expect(search).toBe(true)
    })
})

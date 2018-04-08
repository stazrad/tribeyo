const format = require('../format')

describe('formatter util', () => {
    it('should format area code', () => {
        const areaCode = '615'
        const formatted = format.displayAreaCode(areaCode)

        expect(formatted).toBe('(615)')
    })

    it('should format phone number', () => {
        const number = '6361234567'
        const formatted = format.displayNumber(number)

        expect(formatted).toBe('(636) 123-4567')
    })

    it('should format international phone number', () => {
        const number = '6361234567'
        const formatted = format.internationalNumber(number)

        expect(formatted).toBe('+16361234567')
    })
})

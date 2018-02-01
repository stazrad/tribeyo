module.exports = function User({ name, email }) {
    return {
        name,
        email,
        emailVerified: false,
        twilio: {
            accountSid: '',
            authToken: '',
            number: {
                areaCode: {
                    code: '',
                    display: ''
                },
                forwardToNumber: {
                    displayNumber: '',
                    number: ''
                },
                purchasedNumber: {
                    displayNumber: '',
                    number: ''
                }
            }
        },
        stripe: {
            id: '',
            subscription: ''
        },
        uid: ''
    }
}

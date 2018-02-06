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
                    display: '',
                    number: ''
                },
                purchasedNumber: {
                    display: '',
                    number: ''
                },
                sid: ''
            }
        },
        stripe: {
            id: '',
            subscription: {
                id: '',
                amount: '',
                plan: '',
                subscribed: false
            }
        },
        uid: ''
    }
}

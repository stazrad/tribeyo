// imports
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilio = require('twilio')(accountSid, authToken)
const firebase = require('../firebase')

exports.createUser = ({ name }) => (
    twilio.api.accounts.create({friendlyName: name})
        .then(({ authToken, sid }) => ({authToken, sid}))
        .catch(err => console.log(err))
)

exports.purchaseNumber = ({ areaCode, id }) => {
    // instantiate ref variable updated by promises
    const ref = {}

    return (
        firebase.getUserById(id)
            .then(user => {
                ref.user = user
                const clientSid = ref.clientSid = user.twilio.accountSid
                const clientAuth = user.twilio.authToken
                const client = ref.client = require('twilio')(clientSid, clientAuth)
                return client.availablePhoneNumbers('US').local.list({areaCode})
            })
            .then(options => {
                const number = options[0]
                const { clientSid, user } = ref
                console.log(user.twilio)
                const numberConfig = {
                    accountSid: clientSid,
                    phoneNumber: number.phone_number,
                    friendlyName: user.name,
                    voiceMethod: 'POST',
                    voiceUrl: 'https://www.tribeyo.com/api/voice/' +  user.uid,
                    voiceFallbackMethod: 'POST',
                    voiceFallbackUrl: 'http://twimlets.com/forward?PhoneNumber=' + user.twilio.number.forwardToNumber.number,
                    smsMethod: 'POST',
                    smsUrl: 'https://www.tribeyo.com/api/message/' +  user.uid
                }
                throw 'WHOOPS'
                return client.incomingPhoneNumbers.create(numberConfig)
            })
            .catch(err => console.log(err))
    )
}

exports.setupNumber = ({ forwardToNumber, id }) => {
    // instantiate variables updated by promises
    let client
    let user

    return (
        firebase.getUserById(id)
            .then(foundUser => {
                user = foundUser
                const numberSid = user.twilio.number.sid
                const clientAuth = user.twilio.authToken
                const clientSid  = user.twilio.accountSid
                client = require('twilio')(clientSid, clientAuth)
                return client.incomingPhoneNumbers()
            })
            .then(data => {
                data.update({
                    voiceMethod: 'POST',
                    voiceUrl: `https://www.tribeyo.com/api/voice/${user.uid}`,
                    voiceFallbackMethod: 'POST',
                    voiceFallbackUrl: `http://twimlets.com/forward?PhoneNumber=${forwardToNumber}`,
                    smsMethod: 'POST',
                    smsUrl: `https://www.tribeyo.com/api/message/${user.uid}`
                })
                return client.incomingPhoneNumbers.create(numberConfig)
            })
            .catch(err => console.log(err))
    )
}

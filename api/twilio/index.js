// IMPORTS //
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilio = require('twilio')(accountSid, authToken)
const firebase = require('../firebase')

exports.purchaseNumber = ({ areaCode, id }) => {
    const ref = firebase.db.ref().child(`users/${id}`)
    // instantiate variables updated by promises
    let client,
        clientAuth,
        clientSid,
        user

    ref.once('value')
        .then(snapshot => {
            user  = snapshot.exportVal()
            clientAuth = user.twilio.authToken
            clientSid  = user.twilio.accountSid
            client = require('twilio')(clientSid, clientAuth)
            return client.availablePhoneNumbers('US').local.list({areaCode})
        })
        .then(data => {
            const number = data.availablePhoneNumbers[0]
            const numberConfig = {
                accountSid: clientSid,
                phoneNumber: number.phone_number,
                friendlyName: user.name,
                voiceMethod: 'POST',
                voiceUrl: 'https://www.tribeyo.com/api/voice/' +  user.uid,
                voiceFallbackMethod: 'POST',
                voiceFallbackUrl: 'http://twimlets.com/forward?PhoneNumber=' + forwardToNumber,
                smsMethod: 'POST',
                smsUrl: 'https://www.tribeyo.com/api/message/' +  user.uid
            }
            return client.incomingPhoneNumbers.create(numberConfig)
        })
        .then(purchasedNumber => {
            const number = {
                number: {
                    areaCode: {
                        code: areaCode,
                        display: format.displayAreaCode(areaCode)
                    },
                    forwardToNumber: {
                        display: format.displayNumber(forwardToNumber),
                        number: format.intNumber(forwardToNumber)
                    },
                    purchasedNumber: {
                        display: format.displayNumber(purchasedNumber),
                        number: format.intNumber(purchaseNumber)
                    }
                }
            }

            // update user info in Firebase
            firebase.db.ref().child(`users/${id}/twilio/number`).set(number)
            // transfer number to user Twilio account
            const transferNumber = twilio.accounts(accountSid).incomingPhoneNumbers(purchasedNumber.sid)
            transferNumber.update({accountSid: clientSid})

            const response = {
                message: 'Successfully purchased number forwarded to: ' + forwardToNumber,
                purchasedNumber: purchasedNumber.phoneNumber
            }
            updateAnalytics(200, req.reqId)
			return res.status(200).json(response)
        })
        .catch(err => {
            updateAnalytics(409, req.reqId, err)
    		return res.status(409).json(err)
        })
}

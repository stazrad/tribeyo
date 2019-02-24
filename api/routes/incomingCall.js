// packages
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilio = require('twilio')(accountSid, authToken)
const firebase = require('firebase')
const admin = require('firebase-admin')

// imports
const updateAnalytics = require('../analytics/updateData')

// POST /api/voice/:id
exports.forward = (req, res) => {
    const ref = admin.database().ref().child(`users/${req.params.id}`)
    ref.once('value')
        .then(snapshot => snapshot.exportVal())
        .then(user => {
            console.log('REDIRECT SUCCESFUL!')
            updateAnalytics(200, req.reqId)
            return res.redirect(`http://twimlets.com/forward?PhoneNumber=${user.twilio.number.forwardToNumber.number}`)
        })
        .catch(err => {
            updateAnalytics(500, req.reqId, err)
            return res.status(500).send(err)
        })
}

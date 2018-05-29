// packages
const request = require('request-json')
const jwt = require('jsonwebtoken')
const promisify = require('es6-promisify')
const moment = require('moment')
moment().format()

// imports
const updateAnalytics = require('../analytics/updateData')
const displayFormat = require('../../utils/format')
const Firebase = require('../firebase').default
const stripe = require('../stripe')
const twilio = require('../twilio')

// GET /api/profile/:id
exports.authenticate = (req, res) => {
    const { id } = req.params

    Firebase.authenticate(id)
        .then(result => {
            const err = {
                status: 404,
                message: 'User id does not exist'
            }
            return result
                ? res.status(200).json(result)
                : res.status(404).json(err)
        })
        .catch(err => console.log(err))
}

// POST /api/profile
exports.create = (req, res) => {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
        const error = {
            status: 400,
            message: 'Include name, password & email!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    let id

    Firebase.createUser({email, password})
        .then(userId => {
            id = userId
            const createStripe = stripe.createUser({description: name, email})
            const createTwilio = twilio.createUser({name})
            return Promise.all([createStripe, createTwilio])
        })
        .then(result => {
            return Firebase.storeUser(id, result)
        })
        .then(user => {
            delete user.twilio.authToken
            delete user.twilio.accountSid
            delete user.stripe.id

            return user
        })
        .then(user => {
            const token = jwt.sign(user, process.env.HASH, { expiresIn: '1h' })
            const response = {
                status: 200,
                user
            }
            const accessToken = `access_token=${token}; HttpOnly; Path=/;`

            res.setHeader('Set-Cookie', accessToken)
            updateAnalytics(200, req.reqId)
            return res.status(200).json(response)
        })
        .catch(err => {
            const error = {
                status: 409,
                message: err.message
            }
            updateAnalytics(409, req.reqId, error)
    		return res.status(409).json(error)
        })
}

// POST /api/profile/login
exports.login = (req, res) => {
    const { email, password, stayLoggedIn = false } = req.body

    if (!email || !password) {
        // check for login via cookie
        const authHeader = req.headers['cookie']
        if (authHeader) {
            const cookie = authHeader.split(';').filter(cookie => cookie.includes('access_token'))[0]

            if (cookie) {
                const hash = process.env.HASH
                const token = cookie.split('access_token=')[1]
                let verifyToken

                try {
                    verifyToken = promisify(jwt.verify)
                } catch(err) {
                    const error = {
                        status: 498,
                        message: 'Previous session expired'
                    }
                    updateAnalytics(498, req.reqId, err)
                    return res.status(498).json(error)
                }

                return verifyToken(token, hash)
                    .then(user => Firebase.getUserById(user.uid))
                    .then(user => {
                        const response = {
                            status: 200,
                            user
                        }
                        updateAnalytics(200, req.reqId)
                        return res.status(200).json(response)
                    })
                    .catch(err => {
                        const error = {
                            status: 400,
                            message: 'Failed to login with cookie'
                        }
                        console.log(err)
                        updateAnalytics(400, req.reqId, err)
                        return res.status(400).json(error)
                    })
            }
        } else {
            const error = {
                status: 400,
                message: 'Include password & email!'
            }
            updateAnalytics(400, req.reqId, error)
            return res.status(400).json(error)
        }
    }
    Firebase.loginEmail(email, password)
        .then(user => {
            delete user.twilio.authToken
            delete user.twilio.accountSid
            delete user.stripe.id

            return user
        })
        .then(user => {
            const token = jwt.sign(user, process.env.HASH, { expiresIn: '1hr' })
            const response = {
                status: 200,
                user
            }
            const expires = stayLoggedIn ? ` ${new Date(moment().day(+14))};` : ''
            const accessToken = `access_token=${token};${expires} HttpOnly; Path=/;`

            res.setHeader('Set-Cookie', accessToken)
            updateAnalytics(200, req.reqId)
            return res.status(200).json(response)
        })
        .catch(err => {
            const error = {
                status: 500,
                message: 'Oops! Something went wrong. Try again...'
            }
            updateAnalytics(500, req.reqId, err)
            return res.status(500).json(error)
        })
}

// POST /api/profile/:id/setupNumber
exports.setupNumber = (req, res) => {
    const { forwardToNumber } = req.body

    if (forwardToNumber.length != 10) {
        const error = {
            status: 400,
            message: 'Include valid forward to number!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
	}
    const { id } = req.params

    twilio.setupNumber({forwardToNumber, id})
        .then(purchasedNumber => {
            const number = {
                number: {
                    areaCode: {
                        code: areaCode,
                        display: format.displayAreaCode(areaCode)
                    },
                    forwardToNumber: {
                        display: format.displayNumber(forwardToNumber),
                        number: format.internationalNumber(forwardToNumber)
                    },
                    purchasedNumber: {
                        display: format.displayNumber(purchasedNumber),
                        number: format.internationalNumber(purchaseNumber)
                    }
                }
            }

            // update user info in Firebase
            db.ref().child(`users/${id}/twilio/number`).set(number)
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

// POST /api/profile/:id/subscribe
exports.subscribe = (req, res) => {
    const { areaCode, chargeAmount, token } = req.body
    const { id } = req.params

    if (!token) {
        const error = {
            status: 400,
            message: 'Missing token!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
	}

    Firebase.getUserById(id)
        .then(user => user.stripe.id)
        .then(stripeId => {
            const config = {
                customer: stripeId,
                source: token,
                plan: 'monthlyTwilioNumber'
            }
            return stripe.createSubscription(config)
        })
        .then(({ amount, plan, subscriptionId }) => {
            const configStripe = {
                amount,
                id,
                plan,
                subscribed: true,
                subscriptionId
            }
            const setStripe = Firebase.setStripeSubscription(configStripe)
            const configTwilio = {
                areaCode,
                id
            }
            const purchaseTwilio = twilio.purchaseNumber(configTwilio)
            return Promise.all([setStripe, purchaseTwilio])
        })
        .then(purchasedNumber => {
            // const purchaseNumber = result[1]
            console.log('purchasedNumber',purchasedNumber)
            const config = {
                areaCode,
                id,
                purchasedNumber
            }
            return Firebase.addNumber(config)
        })
        .catch(err => {
            updateAnalytics(500, req.reqId, err)
    		return res.status(500).json(err)
        })
}

// POST /api/profile/:id/unsubscribe
exports.unsubscribe = (req, res) => (
    Firebase.getUserById(req.params.id)
        .then(user => {
            const { id: subscriptionId } = user.stripe.subscription
            return stripe.unsubscribe(subscriptionId)
        })
        .then(() => {
            updateAnalytics(200, req.reqId)
			return res.status(200).json(response)
        })
        .catch(err => {
            updateAnalytics(500, req.reqId, err)
    		return res.status(500).json(err)
        })
)











exports.twilioUsage = function(req, res) {
    var ref = admin.database().ref().child('users')

    ref.once('value')
    .then(function(snapshot){
        var data = snapshot.exportVal()
        var users = []
        var current = 0

        for(var key in data){
            var user = {
                id: data[key].stripe.id,
                amount: 0
            }
            users.push(user)

            var clientSid = data[key].twilio.accountSid
            var clientAuth = data[key].twilio.authToken
            var client = require('twilio')(clientSid, clientAuth)
            var getter = request.createClient('https://'+accountSid+':'+authToken+'@api.twilio.com')

            var usageUrl = '/2010-04-01/Accounts/'+clientSid+'/Usage/Records.json'

            getter.get(usageUrl, function(err, res, body) {
                var parsedPrice = parseFloat(body.usage_records[0].price)
                var totalPrice = 100 * parsedPrice.toFixed(2)
                users[current].amount = totalPrice
                current++
                if(current === users.length) {
                    createInvoiceItem()
                }
            })
        }

        var createInvoiceItem = function() {
            for(var i = 0; i < users.length; i++){
                stripe.createInvoiceItem({
                    customer: users[i].id,
                    amount: users[i].amount,
                    currency: 'usd',
                    description: 'Monthly Usage Cost'
                }, function(err, invoiceItem) {
                    console.log(invoiceItem)
                })
            }
        }
    })
}

// IMPORTS //
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilio = require('twilio')(accountSid, authToken)
const firebase = require('firebase')
const admin = require('firebase-admin')
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const request = require('request-json')
const User = require('../schema/user')
const updateAnalytics = require('../analytics/updateData')
const displayFormat = require('../../utils/format')

// FIREBASE INIT //
const serviceAccount = require('../../serviceAccountKey.json')
firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
})
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
})
const db = admin.database()

// POST /api/profile
exports.create = (req, res) => {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
        const error = {
            status: 400,
            message: 'Include password & email!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({ uid }) => {
            return createTwilioAndStripeAccounts(uid)
        })
        .catch(err => {
            var error = {
                status: 409,
                message: err.message
            }
            updateAnalytics(409, req.reqId, error)
    		return res.status(409).json(error)
        })

    // instantiate a new user object
    const user = new User({name, password})

    function createTwilioAndStripeAccounts(uid) {
        var usersRef = db.ref().child(`users/${uid}`)
        // update user object in Firebase
        var setStripeId         = db.ref().child(`users/${uid}/stripe/id`),
            setTwilioAuthToken  = db.ref().child(`users/${uid}/twilio/authToken`),
            setTwilioAccountSid = db.ref().child(`users/${uid}/twilio/accountSid`),
            setUid              = db.ref().child(`users/${uid}/uid`)
        usersRef.set(user)
            .then(() => {
                setUid.set(uid)
                return stripe.customers.create()
            })
            .then(({ id }) => {
                setStripeId.set(id)
                return twilio.api.accounts.create({friendlyName: name})
            })
            .then(({ authToken, sid }) => {
                setTwilioAuthToken.set(authToken)
                setTwilioAccountSid.set(sid)
                return usersRef.once('value')
            })
            .then(snapshot => snapshot.exportVal())
            .then(user => {
                delete user.twilio.authToken
                delete user.twilio.accountSid
                delete user.stripe.id
                const response = {
                    status: 200,
                    user
                }
                updateAnalytics(200, req.reqId)
    			return res.status(200).json(response)
            })
            .catch(err => {
                updateAnalytics(500, req.reqId, err)
                return res.status(500).send(err)
            })
    }
}

// POST /api/profile/login
exports.login = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        const error = {
            status: 400,
            message: 'Include password & email!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({ emailVerified, uid }) => {
            db.ref().child(`users/${uid}/emailVerified`).set(emailVerified)
            return db.ref().child(`users/${uid}`).once('value')
        })
        .then(snapshot => {
            return snapshot.exportVal()
        })
        .then(user => {
            delete user.twilio.authToken
            delete user.twilio.accountSid
            delete user.stripe.id
            var response = {
                status: 200,
                user
            }
            updateAnalytics(200, req.reqId)
            return res.status(200).json(response)
        })
        .catch(err => {
            updateAnalytics(500, req.reqId, err)
            return res.status(500).send(err)
        })
}

// POST /api/profile/:id/purchaseNumber
exports.purchaseNumber = (req, res) => {
    const { areaCode, forwardToNumber } = req.body

    if (!areaCode || !forwardToNumber) {
        const error = {
            status: 400,
            message: 'Include area code & forward to number!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
	}
    const { id } = req.params
    const ref = db.ref().child(`users/${id}`)
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
    const { chargeAmount, token } = req.body

    if (!token) {
        const error = {
            status: 400,
            message: 'Missing token!'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
	}
    const { id } = req.params
    const stripeSubscription = db.ref().child(`users/${id}/stripe/subscription`)
    const ref = db.ref().child(`users/${id}`)

    ref.once('value')
        .then(snapshot => {
            user  = snapshot.exportVal()
            return user.stripe.id
        })
        .then(stripeId => {
            const config = {
                customer: stripeId,
                source: token.id,
                plan: 'monthlyTwilioNumber',
            }
            return stripe.subscriptions.create(config)
        })
        .then(({ amount, id, plan }) => {
            const config = {
                id,
                plan,
                subscribed: true
            }

            stripeSubscription.set(config)

            console.log('made it')

            //return fetch(`http://${req.headers.host}/api/profile/${id}/purchaseNumber`)
        })
        .catch(err => {
            updateAnalytics(500, req.reqId, err)
    		return res.status(500).json(err)
        })
}


exports.queryUserInfo = function(req, res) {
    var token = req.body.token
    var query = admin.database().ref().child('users/'+req.params.id)
    query.once('value')
        .then(function(snapshot){
            var foundUser = snapshot.exportVal()
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(foundUser))
        })
}


exports.stripeCharge = function(req, res) {
    var token = req.body.token
    var chargeAmount = req.body.chargeAmount
    var setStripeId = admin.database().ref().child('users/'+req.params.id+'/stripe/id')
    var query = admin.database().ref().child('users/'+req.params.id)
    var setSubscriptionPlan = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/plan')
    var setSubscriptionId = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/id')
    var setSubscriptionAmount = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/amount')
    var isSubscribed = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/subscribed')
    var email

    // //instantiate Stripe subscription plan
    // stripe.plans.create({
    //     name: 'Monthly Twilio Number',
    //     id: 'monthlyTwilioNumber',
    //     interval: 'month',
    //     currency: 'usd',
    //     amount: 200,
    // }, function(err, plan) {
    //     console.log('Stripe plan created!')
    //     console.log(plan)
    //     console.log(err)
    // })

    var subscribe = function(id) {
        stripe.subscriptions.create({
            customer: id,
            source: token,
            plan: 'monthlyTwilioNumber',
        }, function(err, subscription) {
            setSubscriptionPlan.set(subscription.plan.id)
            setSubscriptionId.set(subscription.id)
            setSubscriptionAmount.set(subscription.plan.amount)
            isSubscribed.set(true)
            console.log(subscription)
            console.log('User subscribed!')
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({payment: true}))
        })
    }


    query.once('value').then(function(snapshot){
        var foundUser = snapshot.exportVal()


        if(foundUser.twilio.number.purchasedNumber === 'none') {
            subscribe(foundUser.stripe.id)
            console.log('subscribe() called')
        } else {
            console.log('This user has already purchased a number!')
            res.end()
        }
    })


    var singleCharge = function() {
        stripe.charges.create({
            amount: 200,
            currency: 'usd',
            source: token
        }, function(err, charge){
            // if(err & err.type === 'StripeCardError'){
            //     console.log('Card was declined')
            // }
            console.log('Stripe payment successful!')
            console.log(charge)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({payment: true}))
        })
    }
}


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
                stripe.invoiceItems.create({
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


exports.unsubscribe = function(req, res) {
    var ref = admin.database().ref().child('users/'+req.params.id)

    ref.once('value')
    .then(function(snapshot){
        var foundUser = snapshot.exportVal()
        var stripeSubscriptionId = foundUser.stripe.subscription.id

        stripe.subscriptions.del(stripeSubscriptionId, function(err, confirmation) {
            if(err){
                console.log(err)
            } else {
                console.log(confirmation.plan.status)
                console.log('UNSUBSCRIBED')
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({unsubscribed: true}))
            }
        })
    })
}

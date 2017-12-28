// PACKAGES//
var accountSid     = process.env.ACCOUNT_SID,
    authToken      = process.env.AUTH_TOKEN,
    twilio         = require('twilio')(accountSid, authToken),
    firebase       = require('firebase'),
    admin          = require('firebase-admin'),
    stripe         = require('stripe')(process.env.STRIPE_TEST),
    request        = require('request-json');

// FIREBASE INIT //
var serviceAccount = require('../../serviceAccountKey.json');
firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
});
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twilio-app-7c723.firebaseio.com"
});
var db = admin.database();

// IMPORTS //
var updateAnalytics = require('../analytics/updateData');

// POST /api/profile
exports.create = function(req, res) {
    if(!req.body.password || !req.body.email) {
        var error = {
            status: 400,
            message: 'Include password & email!'
        };
        updateAnalytics(400, req.reqId, error);
        return res.status(400).json(error);
    }
    var email    = req.body.email,
        name     = req.body.name,
        password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
        return createTwilioAndStripeAccounts(result.uid);
    })
    .catch(function(err) {
        var error = {
            status: 409,
            message: err.message
        };
        updateAnalytics(409, req.reqId, error);
		return res.status(409).json(error);
    });
    //return //res.status(200).json({status:200,message:'success!'});
    // instantiate a new user object
    var user = {
        name: name,
        email: email,
        twilio: {
            accountSid: 0,
            authToken: 0,
            number: {
                areaCode: 0,
                forwardToNumber: {
                    displayNumber: 0,
                    number: 0
                },
                purchasedNumber: {
                    displayNumber: 0,
                    number: 0
                }
            }
        },
        stripe: {
            id: 0
        }
    };
    function createTwilioAndStripeAccounts(uid) {
        var usersRef = db.ref().child('users/' + uid);
        // update user object in Firebase
        var setStripeId         = db.ref().child('users/'+uid+'/stripe/id'),
            setTwilioAuthToken  = db.ref().child('users/'+uid+'/twilio/authToken'),
            setTwilioAccountSid = db.ref().child('users/'+uid+'/twilio/accountSid');
        usersRef.set(user)
            .then(function() {
                return stripe.customers.create();
            })
            .then(function(customer) {
                setStripeId.set(customer.id);
                return twilio.api.accounts.create({friendlyName: name});
            })
            .then(function(account) {
                setTwilioAuthToken.set(account.authToken);
                setTwilioAccountSid.set(account.sid);
                var response = {
                    status: 200,
                    message: 'New profile created for ' + name + '!',
                    uid: uid
                };
                updateAnalytics(200, req.reqId);
    			return res.status(200).json(response);
            })
            .catch(function(err) {
                updateAnalytics(500, req.reqId, err);
                return res.status(500).send(err);
            });
    };
};

// POST /api/profile/:id/purchaseNumber
exports.purchaseNumber = function(req, res) {
    if(!req.body.areaCode || !req.body.forwardToNumber) {
		updateAnalytics(400, req.reqId, 'INCLUDE AREA CODE & FORWARD TO NUMBER');
		return res.status(400).send('INCLUDE AREA CODE & FORWARD TO NUMBER');
	}
    var areaCode        = req.body.areaCode,
        forwardToNumber = req.body.forwardToNumber,
        id              = req.params.id,
        ref             = db.ref().child('users/'+id);
    // instantiate variables updated by promises
    var client,
        clientAuth,
        clientSid,
        foundUser
    // look up user by id in Firebase
    ref.once('value')
        .then(function(snapshot){
            foundUser  = snapshot.exportVal();
            clientAuth = foundUser.twilio.authToken;
            clientSid  = foundUser.twilio.accountSid;
            client = require('twilio')(clientSid, clientAuth);
            return client.availablePhoneNumbers("US").local.list({areaCode: areaCode});
        })
        .then(function(data){
            var number = data.availablePhoneNumbers[0];
            var numberConfig = {
                phoneNumber: number.phone_number,
                accountSid: clientSid,
                voiceUrl: 'http://www.tribeyo.com/voice/' +  foundUser.uid,
                voiceFallbackUrl: 'http://twimlets.com/forward?PhoneNumber=' + forwardToNumber,
                smsUrl: 'http://www.tribeyo.com/message/' +  foundUser.uid,
                voiceMethod: "POST",
                voiceFallbackMethod: "POST",
                smsMethod: "POST",
                friendlyName: foundUser.name
            }
            return client.incomingPhoneNumbers.create(numberConfig);
        })
        .then(function(purchasedNumber) {
            // update user info in Firebase
            db.ref().child('users/'+id+'/twilio/number/areaCode').set(areaCode);
            db.ref().child('users/'+id+'/twilio/number/purchasedNumber/number').set(purchasedNumber.phoneNumber);
            // transfer number to user Twilio account
            var transferNumber = twilio.accounts(accountSid).incomingPhoneNumbers(purchasedNumber.sid);
            transferNumber.update({accountSid: clientSid});

            var response = {
                status: 200,
                message: 'Successfully purchased number forwarded to: ' + forwardToNumber,
                purchasedNumber: purchasedNumber.phoneNumber
            }
            updateAnalytics(200, req.reqId);
			return res.status(200).json(response);
        })
        .catch(function(err) {
            updateAnalytics(500, req.reqId, err);
            return res.status(500).send(err);
        });
};


exports.auth = function(req, res) {
    var r = req.body;

    admin.auth().verifyIdToken(r.idToken)
    .then(function(decodedToken) {
        var uid = decodedToken.uid;

        admin.auth().getUser(uid)
        .then(function(userRecord) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            // res.json({data: userRecord});
            res.end(JSON.stringify(userRecord));
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
        });

    }).catch(function(error) {
        console.log('error @ admin.auth: ' + error);
    });
};


exports.queryUserInfo = function(req, res) {
    var token = req.body.token;
    var query = admin.database().ref().child('users/'+req.params.id);
    query.once('value')
    .then(function(snapshot){
        var foundUser = snapshot.exportVal();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(foundUser));
    });
};


exports.stripeCharge = function(req, res) {
    var token = req.body.token;
    var chargeAmount = req.body.chargeAmount;
    var setStripeId = admin.database().ref().child('users/'+req.params.id+'/stripe/id');
    var query = admin.database().ref().child('users/'+req.params.id);
    var setSubscriptionPlan = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/plan');
    var setSubscriptionId = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/id');
    var setSubscriptionAmount = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/amount');
    var isSubscribed = admin.database().ref().child('users/'+req.params.id+'/stripe/subscription/subscribed');
    var email;

    // //instantiate Stripe subscription plan
    // stripe.plans.create({
    //     name: "Monthly Twilio Number",
    //     id: "monthlyTwilioNumber",
    //     interval: "month",
    //     currency: "usd",
    //     amount: 200,
    // }, function(err, plan) {
    //     console.log('Stripe plan created!');
    //     console.log(plan);
    //     console.log(err);
    // });

    var subscribe = function(id) {
        stripe.subscriptions.create({
            customer: id,
            source: token,
            plan: "monthlyTwilioNumber",
        }, function(err, subscription) {
            setSubscriptionPlan.set(subscription.plan.id);
            setSubscriptionId.set(subscription.id);
            setSubscriptionAmount.set(subscription.plan.amount);
            isSubscribed.set(true);
            console.log(subscription);
            console.log('User subscribed!');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({payment: true}));
        });
    };


    query.once('value').then(function(snapshot){
        var foundUser = snapshot.exportVal();


        if(foundUser.twilio.number.purchasedNumber === 'none') {
            subscribe(foundUser.stripe.id);
            console.log('subscribe() called');
        } else {
            console.log('This user has already purchased a number!');
            res.end();
        }
    });


    var singleCharge = function() {
        stripe.charges.create({
            amount: 200,
            currency: "usd",
            source: token
        }, function(err, charge){
            // if(err & err.type === 'StripeCardError'){
            //     console.log('Card was declined');
            // }
            console.log('Stripe payment successful!');
            console.log(charge);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({payment: true}));
        });
    };
};


exports.twilioUsage = function(req, res) {
    var ref = admin.database().ref().child('users');

    ref.once('value')
    .then(function(snapshot){
        var data = snapshot.exportVal();
        var users = [];
        var current = 0;

        for(var key in data){
            var user = {
                id: data[key].stripe.id,
                amount: 0
            }
            users.push(user);

            var clientSid = data[key].twilio.accountSid;
            var clientAuth = data[key].twilio.authToken;
            var client = require('twilio')(clientSid, clientAuth);
            var getter = request.createClient('https://'+accountSid+':'+authToken+'@api.twilio.com');

            var usageUrl = '/2010-04-01/Accounts/'+clientSid+'/Usage/Records.json';

            getter.get(usageUrl, function(err, res, body) {
                var parsedPrice = parseFloat(body.usage_records[0].price);
                var totalPrice = 100 * parsedPrice.toFixed(2);
                users[current].amount = totalPrice;
                current++;
                if(current === users.length) {
                    createInvoiceItem();
                };
            });
        };

        var createInvoiceItem = function() {
            for(var i = 0; i < users.length; i++){
                stripe.invoiceItems.create({
                    customer: users[i].id,
                    amount: users[i].amount,
                    currency: 'usd',
                    description: 'Monthly Usage Cost'
                }, function(err, invoiceItem) {
                    console.log(invoiceItem);
                });
            };
        };
    });
};


exports.unsubscribe = function(req, res) {
    var ref = admin.database().ref().child('users/'+req.params.id);

    ref.once('value')
    .then(function(snapshot){
        var foundUser = snapshot.exportVal();
        var stripeSubscriptionId = foundUser.stripe.subscription.id;

        stripe.subscriptions.del(stripeSubscriptionId, function(err, confirmation) {
            if(err){
                console.log(err);
            } else {
                console.log(confirmation.plan.status);
                console.log('UNSUBSCRIBED');
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({unsubscribed: true}));
            };
        });
    });
};

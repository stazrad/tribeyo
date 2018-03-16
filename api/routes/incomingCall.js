// packages
var accountSid     = process.env.ACCOUNT_SID,
    authToken      = process.env.AUTH_TOKEN,
    twilio         = require('twilio')(accountSid, authToken),
    firebase       = require('firebase'),
    admin          = require('firebase-admin');

// imports
var updateAnalytics = require('../analytics/updateData');

// POST /api/voice/:id
exports.forward = function(req, res) {
    var ref = admin.database().ref().child('users/'+req.params.id);
    ref.once('value')
        .then(function(snapshot){
            var foundUser = snapshot.exportVal();
            console.log('REDIRECT SUCCESFUL!');
            updateAnalytics(200, req.reqId);
            return res.redirect('http://twimlets.com/forward?PhoneNumber=' + foundUser.twilioNumber.endpointPhoneNumber);
        })
        .catch(function(err) {
            updateAnalytics(500, req.reqId, err);
            return res.status(500).send(err);
        });
};

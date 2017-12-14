// PACKAGES //
var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    env           = require('dotenv').config(),
    request       = require('request');

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function(path, option) {
    fs.readFile(path, 'utf-8');
});

// ANALYTICS INIT //
var analyticsInit = require('./api/analytics/initData');

// MIDDLEWARE (IMPORTS) //
var analytics  = require('./api/middleware/analytics'),
    auth       = require('./api/middleware/auth'),
    routeMatch = require('./api/middleware/routeMatch');

// MIDDLEWARE //
app.use(auth);
app.use(analytics);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/images', express.static('client/images'));

// SERVE STATIC REACT SPA //
app.use(routeMatch);

// ROUTES (IMPORTS) //
var incomingCall  = require('./api/routes/incomingCall'),
    profile       = require('./api/routes/profile');

// REST API //
app.get('/api/profile/:id/queryUserInfo', profile.queryUserInfo);
app.post('/api/profile', profile.create);
app.post('/api/profile/auth', profile.auth);
app.post('/api/profile/:id/charge', profile.stripeCharge);
app.post('/api/profile/:id/purchaseNumber', profile.purchaseNumber);
app.post('/api/profile/:id/unsubscribe', profile.unsubscribe);
app.post('/api/voice/:id', incomingCall.forward);

// LISTEN ON PORT //
var port = process.env.PORT;
app.listen(port, function() {
    console.log('Server is listening on port: ' + port);
});

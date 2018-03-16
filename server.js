// packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const env = require('dotenv').config()

// VIEW ENGINE //
app.set('view engine', 'html')
app.engine('html', (path, option) => fs.readFile(path, 'utf-8'))

// ANALYTICS INIT //
const analyticsInit = require('./api/analytics/initData')

// MIDDLEWARE (IMPORTS) //
const analytics = require('./api/middleware/analytics')
const auth = require('./api/middleware/auth')
const serveSPA = require('./api/middleware/serveSPA')

// MIDDLEWARE //
//app.use(auth)
app.use(analytics)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('client'))
app.use('/images', express.static('client/images'))

// ROUTES (IMPORTS) //
const incomingCall = require('./api/routes/incomingCall')
const lookup = require('./api/routes/lookup')
const profile = require('./api/routes/profile')

// REST API //
app.get('/api/areaCode/:areaCode', lookup.areaCode)
app.get('/api/autocomplete/:input', lookup.autocomplete)
app.get('/api/searchByCity/:city', lookup.searchByCity)
app.get('/api/validate/:number', lookup.validate)
app.post('/api/profile', profile.create)
app.post('/api/profile/login', profile.login)
app.post('/api/profile/:id/setupNumber', profile.setupNumber)
app.post('/api/profile/:id/subscribe', profile.subscribe)
app.post('/api/profile/:id/unsubscribe', profile.unsubscribe)
app.post('/api/voice/:id', incomingCall.forward)

// SERVE REACT SPA //
app.use(serveSPA)

// LISTEN ON PORT //
const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is listening on port: ' + port)
})

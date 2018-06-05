// packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const env = require('dotenv').config()

// view engine
app.set('view engine', 'html')
app.engine('html', path => fs.readFile(path, 'utf-8'))

// analytics init
const analyticsInit = require('./api/analytics/initData')

// middleware (imports)
const analytics = require('./api/middleware/analytics')
const auth = require('./api/middleware/auth')
const serveSPA = require('./api/middleware/serveSPA')

// authentication
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

// middleware
app.use(auth)
// app.use(analytics)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/images', express.static('client/images'))
app.use('/profile/images', express.static('client/images'))
app.use('/profile/build', express.static('client/build'))
app.use('/profile/:id/:x/:y/:z', express.static('client'))
app.use(express.static('client'))

// routes (imports)
const incomingCall = require('./api/routes/incomingCall')
const lookup = require('./api/routes/lookup')
const profile = require('./api/routes/profile')

// REST api
app.get('/api/areaCode/:areaCode', lookup.areaCode)
app.get('/api/autocomplete/:input', lookup.autocomplete)
app.get('/api/profile/:id', profile.authenticate)
app.get('/api/searchByCity/:city', lookup.searchByCity)
app.get('/api/validate/:number', lookup.validate)

app.post('/api/profile', profile.create)
app.post('/api/profile/login', profile.login)
app.post('/api/profile/:id/setupNumber', profile.setupNumber)
app.post('/api/profile/:id/subscribe', profile.subscribe)
app.post('/api/profile/:id/unsubscribe', profile.unsubscribe)
app.post('/api/voice/:id', incomingCall.forward)

// serve React app
app.use(serveSPA)

// listen on port
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is listening on port: ' + port)
})

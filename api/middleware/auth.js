// packages
const jwt = require('jsonwebtoken')
const promisify = require('es6-promisify')

// imports
const updateAnalytics = require('../analytics/updateData')

module.exports = (req, res, next) => {
    const url = req.originalUrl
    const hash = process.env.HASH

	// ignore requests for static files
    if (!url.includes('/api')) {
        return next()
    }
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
    // ignore login & createUser routes
    if (url == '/api/profile/login' || url == '/api/profile') {
        return next()
    }
    if (req.method === 'OPTIONS') {
        updateAnalytics(200, req.reqId)
		return res.status(200).send('GET, POST')
    }
    const authHeader = req.headers['cookie']

    if (!authHeader) {
        updateAnalytics(401, req.reqId, '401: NO AUTHENTICATION SENT')
        return res.status(401).send('401: NO AUTHENTICATION SENT')
    }
    const token = authHeader.split('access_token=')[1]

    try {
        jwt.verify(token, hash)
        return next()
    } catch(err) {
        console.log(err.message)
        updateAnalytics(403, req.reqId, '403: NOT AUTHORIZED')
        return res.status(403).send('403: NOT AUTHORIZED')
    }
}

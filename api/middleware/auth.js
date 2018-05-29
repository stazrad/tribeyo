// packages
const jwt = require('jsonwebtoken')

// imports
const updateAnalytics = require('../analytics/updateData')

module.exports = (req, res, next) => {
    const url = req.originalUrl

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
    try {
        const authHeader = req.headers['cookie']
        const hash = process.env.HASH
        const cookie = authHeader.split(';').filter(cookie => cookie.includes('access_token'))[0]
        const token = cookie.split('access_token=')[1]

        jwt.verify(token, hash)
        return next()
    } catch(err) {
        const error = {
            status: 401,
            message: 'NOT AUTHORIZED'
        }
        updateAnalytics(401, req.reqId, error)
        return res.status(401).json(error)
    }
}

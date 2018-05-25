// packages
const cuid = require('cuid')
const requestIp = require('request-ip')

// imports
const pushData = require('../analytics/pushData')

module.exports = (req, res, next) => {
    const urlPrefix = req.originalUrl.slice(0,4)
	// ignore requests for static files
    if(urlPrefix !== '/api') {
        return next()
    }
    const browser = req.headers['user-agent']
    const clientIp = requestIp.getClientIp(req)
    const method = req.method
    const id = cuid()
    const url = req.url
    const analytics = {
        id,
        date: Date(),
        browser,
        clientIp,
        method,
        url,
        error: false,
        success: false,
        responseTime: null
    }
    req.reqId = reqId
    pushData(analytics)
    return next()
}

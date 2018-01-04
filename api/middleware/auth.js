// IMPORTS //
var updateAnalytics = require('../analytics/updateData')

module.exports = function(req, res, next) {
    var url     = req.originalUrl.slice(0,4),
        hash    = process.env.HASH
	// ignore requests for static files
    if(url != '/api') {
        return next()
    }
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
    if(req.method === 'OPTIONS') {
        updateAnalytics(200, req.reqId)
		return res.status(200).send('GET, POST')
    }
    var auth = req.headers.authorization
    if(!auth) {
        updateAnalytics(401, req.reqId, '401: NO AUTHENTICATION SENT')
        return res.status(401).send('401: NO AUTHENTICATION SENT')
    }
    var token = auth.split(' ')[1]
    if(token != hash) {
        updateAnalytics(403, req.reqId, '403: NOT AUTHORIZED')
        return res.status(403).send('403: NOT AUTHORIZED')
    }
    return next()
}

// packages
var cuid      = require('cuid'),
    requestIp = require('request-ip');

// imports
var pushData = require('../analytics/pushData');

module.exports = function(req, res, next) {
    var url = req.originalUrl.slice(0,4);
	// ignore requests for static files
    if(url != '/api') {
        return next();
    };
    var browser  = req.headers['user-agent'],
        clientIp = requestIp.getClientIp(req),
        method   = req.method,
        reqId    = cuid(),
        url      = req.url;
    var analytics = {
        id: reqId,
        date: Date(),
        browser: browser,
        clientIp: clientIp,
        method: method,
        url: url,
        error: false,
        success: false,
        responseTime: null
    };
    req.reqId = reqId;
    pushData(analytics);
    return next();
};

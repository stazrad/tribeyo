// PACKAGES //
var accountSid     = process.env.ACCOUNT_SID,
    authToken      = process.env.AUTH_TOKEN,
    twilio         = require('twilio')(accountSid, authToken),
    AreaCode       = require('us-area-codes'),
	promisify	   = require('es6-promisify'),
    fetch          = require('isomorphic-fetch')

// IMPORTS //
var updateAnalytics = require('../analytics/updateData')

// GET /api/areaCode/:areaCode
exports.areaCode = function(req, res) {
    var areaCode = parseInt(req.params.areaCode)
    // if(!areaCode || areaCode.length != 3) {
    //     var error = {
    //         status: 400,
    //         message: 'INVALID AREA CODE'
    //     }
    //     updateAnalytics(400, req.reqId, error)
    //     return res.status(400).json(error)
    // }
    console.log(AreaCode.get(areaCode))
        // .then(result => result.json())
        // .then((result) => {
        //     var response = {
        //         status: 200,
        //         result
        //     }
        //     updateAnalytics(200, req.reqId)
        //     return res.status(200).json(response)
        // })
        // .catch(function(err) {
        //     var error = {
        //         status: 500,
        //         message: err.message
        //     }
        //     updateAnalytics(500, req.reqId, error)
        //     return res.status(500).json(error)
        // })
}

// GET /api/validate/:number
exports.validate = function(req, res) {
    var number = '+1' + req.params.number
    if(!number || number.length != 12) {
        var error = {
            status: 400,
            message: 'INVALID PHONE NUMBER'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    var key = process.env.NUMVERIFY_KEY
	var url = 'http://apilayer.net/api/validate?access_key=' + key + '&number=' + number
	fetch(url)
		.then(result => result.json())
		.then((result) => {
            var response = {
                status: 200,
                type: result.line_type,
                valid: result.valid
            }
            updateAnalytics(200, req.reqId)
            return res.status(200).json(response)
        })
        .catch(function(err) {
            var error = {
                status: 500,
                message: err.message
            }
            updateAnalytics(500, req.reqId, error)
            return res.status(500).json(error)
        })
}

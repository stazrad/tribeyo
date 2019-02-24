// packages
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilio = require('twilio')(accountSid, authToken)
const AreaCodes = require('areacodes')
const areaCodes = new AreaCodes()
const promisify = require('es6-promisify')
const fetch = require('isomorphic-fetch')
const osmosis = require('osmosis')

// imports
const updateAnalytics = require('../analytics/updateData')

// GET /api/areaCode/:areaCode
exports.areaCode = (req, res) => {
    const { areaCode } = req.params
    if(!areaCode || areaCode.length != 3) {
        var error = {
            status: 400,
            message: 'INVALID AREA CODE'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    areaCodes.get(areaCode, (err, result) => {
        if(err || !result.state) {
            const error = {
                status: 500,
                message: 'INVALID AREA CODE'
            }
            updateAnalytics(500, req.reqId, error)
            return res.status(500).json(error)
        }

        const { city, state } = result
        const capitalize = (string, multiple) => {
            if(multiple) {
                let newString = ''
                const words = string.split(' ')
                const extract = words.forEach(word => {
                    newString += capitalize(word) + ' '
                })
                return newString.substring(0, newString.length - 1)
            } else {
                return string.charAt(0).toUpperCase() + string.slice(1)
            }
        }
        const response = {
            city: capitalize(city, true),
            state: capitalize(state, true)
        }
        updateAnalytics(200, req.reqId)
        return res.status(200).json(response)
    })
}

// GET /api/autocomplete/:input
exports.autocomplete = (req, res) => {
    const { input } = req.params
    if(!input) {
        const error = {
            status: 400,
            message: 'INCLUDE INPUT'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    const key = process.env.GOOGLE_KEY
	const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${key}&types=(cities)&components=country:us`
    fetch(url)
        .then(result => result.json())
        .then(({ predictions }) => {
            return predictions.map(({ description }) => description)
        })
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(({ message }) => {
            const error = {
                status: 500,
                message
            }
            updateAnalytics(500, req.reqId, error)
            return res.status(500).json(error)
        })
}

// GET /api/searchByCity/:city
exports.searchByCity = (req, res) => {
    const { city } = req.params
    if(!city) {
        const error = {
            status: 400,
            message: 'INCLUDE CITY'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    const zipcode = '90210'
    osmosis
        .get(`https://www.getzips.com/cgi-bin/ziplook.exe?Zip=${zipcode}`)
        .then((context, data) => {
            console.log(context)
        })
        .data(data => {
            console.log('here',data)
        })
        .log(console.log)

    const areaCode =  Math.floor(Math.random()*(999-100+1)+100).toString()
    const response = {
        code: areaCode,
        display: `(${areaCode})`
    }
    return res.status(200).json(response)
}

// GET /api/validate/:number
exports.validate = (req, res) => {
    const number = `+1${req.params.number}`
    if(!number || number.length != 12) {
        const error = {
            status: 400,
            message: 'INVALID PHONE NUMBER'
        }
        updateAnalytics(400, req.reqId, error)
        return res.status(400).json(error)
    }
    const key = process.env.NUMVERIFY_KEY
	const url = `http://apilayer.net/api/validate?access_key=${key}&number=${number}`
	fetch(url)
		.then(result => result.json())
		.then(({ line_type: type, valid }) => {
            const response = {
                type,
                valid
            }
            updateAnalytics(200, req.reqId)
            return res.status(200).json(response)
        })
        .catch(({ message }) => {
            const error = {
                status: 500,
                message
            }
            updateAnalytics(500, req.reqId, error)
            return res.status(500).json(error)
        })
}

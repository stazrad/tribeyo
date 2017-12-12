var mongoose = require('mongoose'),
    db       = require('../models/db');
    

var TwilioNumberSchema = new mongoose.Schema({
    areaCode: String,
    twilioPhoneNumber: String,
    endpointPhoneNumber: String
});

var TwilioNumber = mongoose.model('TwilioNumber', TwilioNumberSchema);

module.exports = {
    TwilioNumber: TwilioNumber
};
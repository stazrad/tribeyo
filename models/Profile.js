var mongoose     = require('mongoose'),
    db           = require('../models/db'),
    TwilioNumber = require('../models/TwilioNumber.js');

var ProfileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userPhoneNumber: String,
    twilioPhoneNumbers: [TwilioNumber],
    password: String
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = {
    Profile: Profile
}
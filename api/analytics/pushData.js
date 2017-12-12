// PACKAGES //
var fs = require('fs');

// IMPORTS //
var storage = require('./data/storage.json');

module.exports = function(analytics) {
    storage.usage.push(analytics);
    fs.writeFile('./api/analytics/data/storage.json', JSON.stringify(storage, null, 4), function(err) {
        if(err) console.log(err);
    });
};

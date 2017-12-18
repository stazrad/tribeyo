// PACKAGES //
var fs = require('fs');

// IMPORTS //
var storage = require('./data/storage.json');

module.exports = function(status, reqId, err) {
    var updateStorage = function(updatedStorage) {
        fs.writeFile('./api/analytics/data/storage.json', JSON.stringify(updatedStorage, null, 4), function(err) {
            if(err) console.log(err);
        });
    }
    // match current req to existing req in storage array by reqId
    var i = storage.usage.findIndex(function(record) {
       return record.id == reqId;
    });
    var storedReq = storage.usage[i];

    if(!storedReq) return;

    // calculate total time of request in node.js
    storedReq.responseTime = Math.abs(new Date() - new Date(storedReq.date));

    if(status == 200) {
        storedReq.success = true;
        return updateStorage(storage);
    } else {
        console.log('error: ', err);
        storedReq.error = err;
        return updateStorage(storage);
    };
};

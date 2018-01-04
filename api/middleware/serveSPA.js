// PACKAGES //
var path = require('path')

module.exports = function(req, res) {
    // send React SPA
    return res.sendFile(path.join(__dirname, '../../client/index.html'))
}

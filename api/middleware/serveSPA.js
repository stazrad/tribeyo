// packages
const path = require('path')

module.exports = (req, res) => {
    // send React SPA
    return res.sendFile(path.join(__dirname, '../../client/index.html'))
}

// send React SPA
module.exports = (req, res) => res.sendFile('index.html', { root: './client' })

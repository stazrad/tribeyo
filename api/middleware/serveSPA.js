module.exports = (req, res) => {
    console.log('req', req.originalUrl, __dirname)
    // send React SPA
    return res.sendFile('index.html', { root: './client' })
}

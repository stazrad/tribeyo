// GET /api/searchByInmate
exports.searchByInmate = (req, res) => {
    const { nameFirst, nameLast } = req.query
    if (!nameFirst || !nameLast) {
        var error = {
            status: 400,
            message: 'Include first and last name.'
        }
        return res.status(400).json(error)
    }
    fetch(`http://www.bop.gov/PublicInfo/execute/inmateloc?todo=query&output=json&nameLast=${nameLast}&nameFirst=${nameFirst}`)
        .then(res => res.json())
        .then(result => {
            const results = [
                ...result.InmateLocator
            ]

            return res.status(200).json(results)
        })
        .catch(err => res.status(500).json(err))
}

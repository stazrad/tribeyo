// GET /api/searchByFaclCode/:faclCode
exports.searchByFaclCode = (req, res) => {
    const { faclCode } = req.params
    if (!faclCode) {
        const error = {
            status: 400,
            message: 'Include facility code.'
        }
        return res.status(400).json(error)
    }
    fetch(`http://www.bop.gov/PublicInfo/execute/phyloc?todo=query&output=json&code=${faclCode}`)
        .then(res => res.json())
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => res.status(500).json(err))
}

// GET /api/searchByInmate
exports.searchByInmate = (req, res) => {
    const { nameFirst, nameLast } = req.query
    if (!nameFirst || !nameLast) {
        const error = {
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

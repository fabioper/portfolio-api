const queryParser = {
    parse(query) {
        return parseInt(query, 10) || query.replace(/,/g, ' ')
    },

    queries(req, res, next) {
        const opts = {}

        Object.keys(req.query).forEach(query => {
            opts[query] = queryParser.parse(req.query[query])
        })

        req.queries = opts
        next()
    }
}

module.exports = queryParser.queries

const parse = function(query) {
    return parseInt(query, 10) || query.replace(/,/g, ' ')
}

const parseQuery = function(req, res, next) {
    const queries = {}

    Object.keys(req.query).forEach(query => {
        queries[query] = parse(req.query[query])
    })

    req.queries = queries
    next()
}

module.exports = parseQuery

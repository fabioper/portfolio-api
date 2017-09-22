const qs = require('qs')

const queryParser = {
    parse(query) {
        return parseInt(query, 10) || query.replace(/,/g, ' ')
    },

    queries(queries) {
        const opts = {}

        const parsedQueries = qs.parse(queries)

        Object.keys(parsedQueries).forEach(query => {
            opts[query] = queryParser.parse(parsedQueries[query])
        })

        return opts
    }
}

module.exports = queryParser.queries

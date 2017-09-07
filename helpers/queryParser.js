const qs = require('qs')

const queryParser = {
    parse(query) {
        return parseInt(query, 10) || query.replace(/,/g, ' ')
    },

    queries(queries) {
        const opts = {}

        queries = qs.parse(queries)

        Object.keys(queries).forEach(query => {
            opts[query] = queryParser.parse(queries[query])
        })

        return opts
    }
}

module.exports = queryParser.queries

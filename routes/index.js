const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ 'message': 'Portfólio API' })
})

module.exports = router

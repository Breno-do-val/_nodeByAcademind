const express = require('express')

const Router = express.Router()

Router.get('/', (req, res) => {
    res.send('<h1>Welcome to my online shop</h1>')
})

module.exports = Router
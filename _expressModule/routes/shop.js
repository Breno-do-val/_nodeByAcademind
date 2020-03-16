const path = require('path')

const express = require('express')

const rootDir = require('../util/path')
const adminData = require('./admin')

const Router = express.Router()

Router.get('/', (req, res) => {
    console.log(adminData.products)
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

module.exports = Router
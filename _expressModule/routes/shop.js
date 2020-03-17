const path = require('path')

const express = require('express')

const rootDir = require('../util/path')
const adminData = require('./admin')

const Router = express.Router()

Router.get('/', (req, res) => {
    const products = adminData.products
    res.render('shop', {prods: products, myTitle: 'Shop'} )
})

module.exports = Router
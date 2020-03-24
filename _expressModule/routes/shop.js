const path = require('path')

const express = require('express')

const shopController = require('../controllers/shop')

const Router = express.Router()

Router.get('/', shopController.getIndex)

Router.get('/products', shopController.getProducts)

Router.get('/cart', shopController.getCart)

Router.get('/checkout', shopController.getCheckout)


module.exports = Router
const path = require('path')
const express = require('express')

const productsController = require('../controllers/products')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct) //Do not execute, only as reference

// /admin/add-product => POST
router.post('/add-product', productsController.postProduct)

module.exports = router

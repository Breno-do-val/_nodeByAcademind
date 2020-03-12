const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : true }))

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(adminRoutes)
app.use(shopRoutes)




app.listen(3000)
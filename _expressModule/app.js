const path = require('path')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.static(path.join(__dirname, 'public')))

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})


app.listen(3000)
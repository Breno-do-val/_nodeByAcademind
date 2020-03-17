const path = require('path')

const express = require('express')
const app = express()

app.set('view engine', 'pug') //it tells which template engine to be used to generate dynamic content
app.set('views', 'views') // to tell where the files are located

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.static(path.join(__dirname, 'public')))

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).render('404')
})


app.listen(3000)
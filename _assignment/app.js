const http = require('http')

const routes = require('./routes')

const app = http.createServer(routes)

app.listen(3000)
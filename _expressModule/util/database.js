const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodebyacademind',
    password: 'd4t4b4s3'
})

module.exports = pool.promise()
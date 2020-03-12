const routes = (req, res) => {
    const url = req.url
    
    if (url === '/') {
        res.setHeader('Content-Type', 'text,html')
        res.write('<html>')
        res.write('<body>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"></input><button type="submit">Submit</button></form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text,html')
        res.write('<html>')
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/create-user') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            console.log(message)
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        })
    }
}

module.exports = routes
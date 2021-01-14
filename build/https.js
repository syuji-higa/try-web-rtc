const { join } = require('path')
const { readFileSync } = require('fs')
const express = require('express')
const app = express()
const https = require('https')

app.use(express.static(join(__dirname, 'build')))

const server = https.createServer({
  key: readFileSync('localhost+4-key.pem'),
  cert: readFileSync('localhost+4.pem')
}, app)

const host = '192.168.0.2'
const port = 8081

server.listen(port, host, () => {
  console.log('listening at https://%s:%s', host, port)
})

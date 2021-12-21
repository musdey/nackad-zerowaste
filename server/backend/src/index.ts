import app from './app'
import http from 'http'
import https from 'https'
const port = 3000
console.log('Server running on port ', port)
let server
if (process.env.NODE_ENV === 'production') {
  server = https.createServer(app)
} else {
  server = http.createServer(app)
}
server.listen(port)

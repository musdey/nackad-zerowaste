import app from './app'
import http from 'http'
const port = 3000
// console.log('Server running on port ', port)
// let server
// if (process.env.NODE_ENV === 'PRODUCTION') {
//   server = https.createServer(app)
//   console.log('HTTPS')
// } else {
//   console.log('HTTP')
//   server = http.createServer(app)
// }
const server = http.createServer(app)
server.listen(port)

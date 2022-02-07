import express, { NextFunction, Request, Response } from 'express'
import routerV1 from './routes/router'
import logger from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'
import notFoundHandler from './middleware/not-found-handler'
import errorHandler from './middleware/error-handler'
import crypto from 'crypto'
import connectDB from './lib/db/connect'
import initalizeRoles from './lib/db/initalizeRoles'
// import dbNotUp from './middleware/db-not-up'

dotenv.config()

const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbUser = process.env.MONGO_NON_ROOT_USERNAME || ''
const mongodbPw = process.env.MONGO_NON_ROOT_PASSWORD || 'user'
const mongodbDBName = process.env.MONGO_INITDB_DATABASE || 'nackad-database'

// Connect mongoose
connectDB(mongodbHost, 27017, mongodbUser, mongodbPw, mongodbDBName, 10000)
initalizeRoles()
//initializeTestUser()

const app = express()

// Setup middleware
app.use(logger('dev'))
// app.use(dbNotUp)
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})
app.use(cors())
app.use(
  express.json({
    limit: '50mb',
    verify: function (req: any, res, buf, encoding) {
      req.rawBody = buf
    }
  })
)
// app.use(express.static(path.join(__dirname, 'public')))

// Setup routes
app.use('/api/v1', routerV1)
app.use(notFoundHandler())
app.use(errorHandler())

export default app

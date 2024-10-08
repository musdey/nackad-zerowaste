import express, { NextFunction, Request, Response } from 'express'
import routerV1 from './routes/router'
import logger from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'
import notFoundHandler from './middleware/not-found-handler'
import errorHandler from './middleware/error-handler'
import connectDB from './lib/db/connect'
import initalizeRoles from './lib/db/initalizeRoles'
import settings from './lib/db/initalizeShopSettings'
import rateLimit from 'express-rate-limit'
import path from 'path'
import cron from 'node-cron'
import multer from 'multer'
import initializeTestUser from './lib/db/initalizeTestUser'
dotenv.config()

const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbUser = process.env.MONGO_NON_ROOT_USERNAME || ''
const mongodbPw = process.env.MONGO_NON_ROOT_PASSWORD || ''
const mongodbDBName = process.env.MONGO_INITDB_DATABASE || 'nackad-database'

// Connect mongoose
connectDB(mongodbHost, 27017, mongodbUser, mongodbPw, mongodbDBName, 10000)
const startup = async () => {
  await initalizeRoles()
  await settings.initializeShops(['REXEAT', 'NACKAD'])
  await settings.initializeSettings()
  await settings.initalizeDeliverySlots()
  await settings.initProducts()
  await settings.registerRechargeWebhooks()
  await settings.initRexeatDepositTypes()
  if (process.env.NODE_ENV === 'development') {
    await initializeTestUser()
  }
}

startup()

const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

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

cron.schedule('0 1 * * *', async () => {
  await settings.initalizeDeliverySlots()
  console.log('DeliverySlots created')
})

const upload = multer()
app.use(upload.single('file'))

app.use('/api/v1', routerV1)
// Setup routes
// app.use('/*', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(notFoundHandler())
app.use(errorHandler())

export default app

import express, { NextFunction, Request, Response } from 'express'
import routerV1 from './routes/router'
import logger from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'
import notFoundHandler from './middleware/not-found-handler'
import errorHandler from './middleware/error-handler'
import crypto from 'crypto'
import Order from './types/order'
import Address from './types/address'
import ShopifyAdmin from './controller/shopifyAdminController'
import fs from 'fs/promises'
import connectDB from './lib/db/connect'
import initalizeRoles from './lib/db/initalizeRoles'
import initializeTestUser from './lib/db/initalizeTestUser'
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
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))

// Setup routes
app.use('/api/v1', routerV1)
app.use('/hikevin', (req: Request, res: Response) => {
  console.log('-------------------------------------------------------------------------------------------------------')
  console.log(req.body)
  console.log('-------------------------------------------------------------------------------------------------------')
  const oneOrder = req.body as Order
  const shippingAddress = oneOrder.shipping_address as Address
  console.log(JSON.stringify(oneOrder))
  oneOrder.line_items?.forEach((item) => {
    console.log(item.properties)
  })
  res.send('done')
})
app.use(notFoundHandler())
app.use(errorHandler())

crypto.randomBytes(24, function (err, buffer) {
  const token = buffer.toString('hex')
  console.log(token)
})

export default app

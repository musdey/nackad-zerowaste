import express from 'express'
import { createNewOrder, orderCancelled, orderUpdates } from '../controller/orders.controller'

const webhookRouter = express.Router()
webhookRouter.post('/new-order', createNewOrder)
webhookRouter.post('/order-updates', orderUpdates)
webhookRouter.post('/order-cancelled', orderCancelled)
export default webhookRouter

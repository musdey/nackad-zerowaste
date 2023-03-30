import express from 'express'
import orderHandler from '../handler/orders.handler'

const webhookRouter = express.Router()
webhookRouter.post('/new-order', orderHandler.createNewNackadOrderHandler)
webhookRouter.post('/order-updates', orderHandler.orderUpdates)
webhookRouter.post('/order-cancelled', orderHandler.orderCancelled)
export default webhookRouter

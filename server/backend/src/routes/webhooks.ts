import express from 'express'
import productsController from '../controller/products.controller'
import orderHandler from '../handler/orders.handler'

const webhookRouter = express.Router()
webhookRouter.post('/new-order', orderHandler.createNewNackadOrderHandler)
webhookRouter.post('/order-updates', orderHandler.orderUpdates)
webhookRouter.post('/order-cancelled', orderHandler.orderCancelled)
webhookRouter.post('/new-products-added', productsController.triggerUpdateProductsHandler)
export default webhookRouter

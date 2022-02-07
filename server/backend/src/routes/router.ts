import express from 'express'
import { updateProducts } from '../controller/products.controller'
import { createNewOrder } from '../controller/orders.controller'
import verifyWebhook from '../middleware/verifyWebhook'
const router = express.Router()

router.get('/update-products', updateProducts)
router.post('/webhooks/new-order', verifyWebhook, createNewOrder)

export default router

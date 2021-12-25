import express from 'express'
import { updateProducts } from '../controller/products.controller'
const router = express.Router()

router.get('/update-products', updateProducts)

export default router

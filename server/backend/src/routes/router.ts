import express from 'express'
import { updateProducts } from '../controller/products.controller'
import verifyWebhook from '../middleware/verifyWebhook'
import verifyBody from '../middleware/verifyBody'
import verifySignUp from '../middleware/verifySignup'
import authJwt from '../middleware/authJwt'
import { signup, signin, signinWithOTP, requestOTP } from '../controller/auth.controller'
import { updateUserRoleHandler, getAllUsersHandler, getUserHandler } from '../handler/user.handler'
import deliveryHandler from '../handler/delivery.handler'
import webhookRouter from './webhooks'
const router = express.Router()

router.post('*', verifyBody)

// User Management
router.post('/auth/signup', verifySignUp.checkDuplicateUsernameOrEmail, signup)
router.post('/auth/signin', signin)
router.post('/auth/updateUserRole', [authJwt.verifyToken, authJwt.isAdmin], updateUserRoleHandler)
router.get('/user/all', [authJwt.verifyToken, authJwt.isAdmin], getAllUsersHandler)
router.get('/user', [authJwt.verifyToken, authJwt.isCustomer], getUserHandler)
// router.post('/auth/signinWithOTP', signinWithOTP)
// router.post('/auth/requestOTP', requestOTP)

// Delivery Management ACHTUNG EMPLOYEE
router.get('/delivery/open', deliveryHandler.getCurrentOpenDeliveries)

// Shopify Webhooks & Product Database
router.get('/update-products', updateProducts)
router.use('/webhooks', verifyWebhook, webhookRouter)

export default router

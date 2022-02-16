import express from 'express'
import { updateProducts } from '../controller/products.controller'
import verifyWebhook from '../middleware/verifyWebhook'
import verifyBody from '../middleware/verifyBody'
import verifySignUp from '../middleware/verifySignup'
import authJwt from '../middleware/authJwt'
import { signup, signin, signinWithOTP, requestOTP } from '../controller/auth.controller'
import { getAllUsers, getUser, updateUserRole } from '../controller/user.controller'
import { showAllOpenOrders } from '../controller/delivery.controller'
import webhookRouter from './webhooks'
const router = express.Router()

router.post('*', verifyBody)

// User Management
router.post('/auth/signup', verifySignUp.checkDuplicateUsernameOrEmail, signup)
router.post('/auth/signin', signin)
router.post('/auth/updateUserRole', [authJwt.verifyToken, authJwt.isAdmin], updateUserRole)
router.get('/user/all', [authJwt.verifyToken, authJwt.isAdmin], getAllUsers)
router.get('/user', [authJwt.verifyToken, authJwt.isCustomer], getUser)
// router.post('/auth/signinWithOTP', signinWithOTP)
// router.post('/auth/requestOTP', requestOTP)

// Delivery Management ACHTUNG EMPLOYEE
router.get('/delivery/open', showAllOpenOrders)

// Shopify Webhooks & Product Database
router.get('/update-products', updateProducts)
router.use('/webhooks', verifyWebhook, webhookRouter)

export default router

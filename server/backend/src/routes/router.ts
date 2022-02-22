import express from 'express'
import { updateProducts } from '../controller/products.controller'
import verifyWebhook from '../middleware/verifyWebhook'
import verifyBody from '../middleware/verifyBody'
import verifySignUp from '../middleware/verifySignup'
import authJwt from '../middleware/authJwt'
import { signup, signin, signinWithOTP, requestOTP } from '../controller/auth.controller'
import userHandler from '../handler/user.handler'
import deliveryHandler from '../handler/delivery.handler'
import webhookRouter from './webhooks'
import { getSettingsHandler, updateSettingsHandler } from '../handler/settings.handler'
import deliverySlotHandler from '../handler/deliverySlots.handler'
import orderHandler from '../handler/orders.handler'
import depositHandler from '../handler/deposit.handler'
const router = express.Router()

router.post('*', verifyBody)

// User Management
router.post('/auth/signup', verifySignUp.checkDuplicateUsernameOrEmail, signup)
router.post('/auth/signin', signin)
router.post('/auth/updateUserRole', [authJwt.verifyToken, authJwt.isAdmin], userHandler.updateUserRole)
router.get('/user/all', [authJwt.verifyToken, authJwt.isAdmin], userHandler.getAll)
router.get('/user/employees', [authJwt.verifyToken, authJwt.isAdmin], userHandler.getEmployees)
router.get('/user/admins', [authJwt.verifyToken, authJwt.isAdmin], userHandler.getAdmins)
router.post('/user/search', [authJwt.verifyToken, authJwt.isEmployee], userHandler.searchUser)
router.get('/user', [authJwt.verifyToken, authJwt.isCustomer], userHandler.getSelf)
// router.post('/user/update)

// Open routes
router.get('/settings', getSettingsHandler)
router.get('/deliveryslots', deliverySlotHandler.getAllPublic)
router.get('/deposit/:shopifyUserId', depositHandler.getDepositByShopifyId)

// Delivery Management ACHTUNG EMPLOYEE
router.get('/user/:id/deposit', [authJwt.verifyToken, authJwt.isEmployee], depositHandler.getDepositByUserId)
router.get('/deposit/:id', [authJwt.verifyToken, authJwt.isEmployee], depositHandler.getDepositById)
router.get('/delivery/open', [authJwt.verifyToken, authJwt.isEmployee], deliveryHandler.getCurrentOpenDeliveries)
router.get('/deliveryslots/detail', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.getAllManagement)
router.post('/deliveryslot/add', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.addSlot)
router.post('/deliveryslot/remove', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.removeSlot)
router.get('/orders/today', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getToday)
router.get('/orders/future', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getFuture)
router.get('/orders/all', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getAll)
router.get('/orders/current', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getCurrent)

// Shopify Webhooks & Product Database
router.get('/update-products', updateProducts)
router.use('/webhooks', verifyWebhook, webhookRouter)

// Admin routes
router.post('/settings/update', [authJwt.verifyToken, authJwt.isAdmin], updateSettingsHandler)

router.post('/test/webhook/new-order', orderHandler.createNewOrder)

export default router

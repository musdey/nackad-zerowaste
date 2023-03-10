import express from 'express'
import productsController from '../controller/products.controller'
import verifyWebhook from '../middleware/verifyWebhook'
import verifyBody from '../middleware/verifyBody'
import verifySignUp from '../middleware/verifySignup'
import authJwt from '../middleware/authJwt'
import authHandler from '../handler/auth.handler'
import userHandler from '../handler/user.handler'
import deliveryHandler from '../handler/delivery.handler'
import webhookRouter from './webhooks'
import settingsHandler from '../handler/settings.handler'
import deliverySlotHandler from '../handler/deliverySlots.handler'
import orderHandler from '../handler/orders.handler'
import depositHandler from '../handler/deposit.handler'
import rechargeWebhookRouter from './rechargeWebhooks'
import verifyRechargeWebhook from '../middleware/verifyRechargeWebhook'
import passwordController from '../controller/pw.controller'
import createNewNackadOrder from '../controller/orders/nackad.orders'
import verifyRexeatWebhook from '../middleware/verifyRexeatWebhook'
import imageHandler from '../handler/image.handler'

const router = express.Router()

router.post('*', verifyBody)

// User Management
router.post('/auth/signup', verifySignUp.checkDuplicateUsernameOrEmail, authHandler.signup)
router.post('/auth/signin', authHandler.signin)

router.get('/user/all', [authJwt.verifyToken, authJwt.isManager], userHandler.getAll)
router.get('/user/employees', [authJwt.verifyToken, authJwt.isManager], userHandler.getEmployees)
router.post('/user/search', [authJwt.verifyToken, authJwt.isEmployee], userHandler.searchUser)
router.get('/user', [authJwt.verifyToken, authJwt.isCustomer], userHandler.getSelf)
router.post('/user/role/update', [authJwt.verifyToken, authJwt.isManager], userHandler.updateUserRole)
router.post('/user/update', [authJwt.verifyToken, authJwt.isEmployee], userHandler.updateUser)

router.post('/pw/reset-pw-request', passwordController.passwordResetRequest)
router.get('/pw/reset-pw-check/:token', passwordController.passwordResetCheckToken)
router.post('/pw/reset-pw', passwordController.passwordReset)

// Open routes
router.get('/settings', settingsHandler.getSettingsHandler)
router.get('/deliveryslots', deliverySlotHandler.getNackadPublic)
router.get('/deliveryslots/rexeat', deliverySlotHandler.getRexeatPublic)
router.get('/opendeposit/:webShopUserId', depositHandler.getDepositByWebShopUserId)

// Delivery Management ACHTUNG EMPLOYEE
router.get('/user/:id/deposit', [authJwt.verifyToken, authJwt.isEmployee], depositHandler.getDepositByUserId)
router.get('/deposit/:id', [authJwt.verifyToken, authJwt.isEmployee], depositHandler.getDepositById)
router.get('/deposit-types', [authJwt.verifyToken, authJwt.isEmployee], depositHandler.getDepositTypes)
router.get('/deposit/aggregated/:id', [authJwt.verifyToken, authJwt.isEmployee], depositHandler.getAggregatedDeposit)
router.post('/deposit/return', [authJwt.verifyToken, authJwt.isEmployee, depositHandler.returnDeposit])
router.post('/deposit/add', [authJwt.verifyToken, authJwt.isEmployee, depositHandler.addNewDeposit])
router.post('/delivery/search', [authJwt.verifyToken, authJwt.isEmployee, deliveryHandler.searchDelivery])
router.get('/delivery/open', [authJwt.verifyToken, authJwt.isEmployee], deliveryHandler.getCurrentOpenDeliveries)
router.get('/delivery/all', [authJwt.verifyToken, authJwt.isEmployee], deliveryHandler.getAllDeliveries)
router.post('/deliveryslot/:id', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.updateDeliverySlotById)
router.get('/deliveryslots/detail', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.getAllManagement)
router.post('/deliveryslot/:id/add', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.addSlot)
router.post('/deliveryslot/:id/remove', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.removeSlot)
router.get('/deliveryslots/overview', [authJwt.verifyToken, authJwt.isEmployee], deliverySlotHandler.getDeliverySlotsPerDay)
router.get('/orders/today', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getToday)
router.get('/orders/future', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getFuture)
router.get('/orders/all', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getAll)
router.get('/orders/current', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getCurrent)
router.get('/order/:id', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.getShopifyOrderById)
router.post('/order/:id', [authJwt.verifyToken, authJwt.isEmployee], orderHandler.updateShopifyOrderById)
router.post('/delivery/:id/status', [authJwt.verifyToken, authJwt.isEmployee], deliveryHandler.updateDeliveryStatus)
router.get('/delivery/:id', [authJwt.verifyToken, authJwt.isEmployee], deliveryHandler.getDelivery)
router.post('/images/:id/add', [authJwt.verifyToken, authJwt.isEmployee], imageHandler.uploadImage)
router.get('/images', [authJwt.verifyToken, authJwt.isEmployee], imageHandler.getImage)
router.delete('/images', [authJwt.verifyToken, authJwt.isEmployee], imageHandler.deleteImage)

// Shopify Webhooks & Product Database
router.get('/update-products', productsController.triggerUpdateProductsHandler)
router.post('/update-products-handler', productsController.handleIncomingProductsHandler)
router.post('/webhooks/new-rexeat-order', verifyRexeatWebhook, orderHandler.createNewRexeatOrderHandler)

router.use('/webhooks', verifyWebhook, webhookRouter)
router.use('/recharge-webhooks', verifyRechargeWebhook, rechargeWebhookRouter)

// Manager routes
router.get('/settings/admin', [authJwt.verifyToken, authJwt.isManager], settingsHandler.getSettingsAdminHandler)
router.post('/settings/update', [authJwt.verifyToken, authJwt.isManager], settingsHandler.updateSettingsHandler)
router.post('/settings/sms', [authJwt.verifyToken, authJwt.isManager], settingsHandler.updateSMSSettings)
router.get('/settings/sms', [authJwt.verifyToken, authJwt.isManager], settingsHandler.getSMSSettings)
router.get('/statistics', [authJwt.verifyToken, authJwt.isManager], settingsHandler.getStatistics)
router.get('/auth/createpin', [authJwt.verifyToken, authJwt.isManager], authHandler.requestSignupOTP)
router.post('/test/webhook/new-order', createNewNackadOrder)

export default router

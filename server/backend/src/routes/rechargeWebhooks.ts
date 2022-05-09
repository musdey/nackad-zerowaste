import express from 'express'
import rechargeController from '../controller/recharge.controller'

const rechargeWebhookRouter = express.Router()
rechargeWebhookRouter.post('/charge-created', rechargeController.chargeCreated)
rechargeWebhookRouter.post('/subscription-created', rechargeController.subscriptionCreated)
export default rechargeWebhookRouter

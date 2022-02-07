import { NextFunction, Response } from 'express'
import crypto from 'crypto'
import Config from '../Config'

// Verify incoming webhook.
const checkVerification = (payload: Buffer, hmac: string) => {
  const genHash = crypto.createHmac('sha256', Config.webHooks.newOrder).update(payload).digest('base64')
  console.log(hmac)
  console.log(genHash)
  return genHash === hmac
}

const verifyWebhook = async (req: any, res: Response, next: NextFunction) => {
  const hmac = req.get('x-shopify-hmac-sha256')
  const topic = req.get('x-shopify-topic')
  const shop = req.get('x-shopify-shop-domain')
  const verified = checkVerification(req.rawBody, hmac!)

  if (!verified) {
    console.log('Failed to verify the incoming request.')
    res.status(403).send('Could not verify request.')
    return
  }

  const data = req.body.toString()

  console.log(`Verified webhook request. Shop: ${shop} Topic: ${topic} \n Payload: \n ${data}`)

  next()
}
export default verifyWebhook

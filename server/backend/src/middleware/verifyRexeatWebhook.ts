import { NextFunction, Response } from 'express'
import crypto from 'crypto'
import Config from '../Config'

// Verify incoming webhook.
const checkVerification = (payload: Buffer, hmac: string) => {
  const genHash = crypto.createHmac('sha256', Config.webHooks.newOrder).update(payload).digest('base64')
  return genHash === hmac
}

const verifyRexeatWebhook = async (req: any, res: Response, next: NextFunction) => {
  const key = req.get('x-webhook-key')

  if (key !== '2x+rDeG%C@aZ3Xnu5g6C&sg85dYPDDqn') {
    console.log('Failed to verify the incoming request.')
    res.status(403).send('Could not verify request.')
    return
  }

  const data = req.body.toString()

  console.log(`Verified webhook request. Shop: Rexat Topic: `)

  next()
}
export default verifyRexeatWebhook

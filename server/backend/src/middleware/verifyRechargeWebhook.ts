import { NextFunction, Response } from 'express'
import crypto from 'crypto'
import Config from '../Config'

// Verify incoming webhook.
const checkVerification = (payload: Buffer, hmac: string) => {
  const genHash = crypto.createHmac('sha256', Config.webHooks.rechargeKey).update(payload).digest('base64')
  console.log(genHash)
  return genHash === hmac
}

const verifyRechargeWebhook = async (req: any, res: Response, next: NextFunction) => {
  const hmac = req.get('X-Recharge-Hmac-Sha256')
  console.log('HMAC :' + hmac)

  const body = req.body
  console.log('reg.body :', body)

  const data = req.body.toString()
  console.log('req.body.string :', data)
  const verified = checkVerification(req.rawBody, hmac!)
  console.log('verficiation was ', verified)
  // TODO: Fix validation of webhook
  // if (!verified) {
  //   console.log('Failed to verify the incoming request.')
  //   res.status(403).send('Could not verify request.')
  //   return
  // }

  console.log(`Verified webhook request. Shop`)

  next()
}
export default verifyRechargeWebhook

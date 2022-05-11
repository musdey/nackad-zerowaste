import { NextFunction, Response } from 'express'
import crypto from 'crypto'
import Config from '../Config'

// Verify incoming webhook.
const checkVerification = (payload: string, hmac: string) => {
  const genHash = crypto
    .createHash('sha256')
    .update(Config.webHooks.rechargeKey, 'utf-8')
    .update(payload, 'utf-8')
    .digest('hex')

  console.log(genHash)
  return genHash === hmac
}

const verifyRechargeWebhook = async (req: any, res: Response, next: NextFunction) => {
  const hmac = req.get('X-Recharge-Hmac-Sha256')
  console.log('HMAC: ' + hmac)

  const body = req.body
  console.log('--------------------')
  console.log(JSON.stringify(body, null, 4))
  console.log('--------------------')
  console.log('Req.rawbody')
  console.log(req.rawBody)
  console.log('--------------------')
  const verified = checkVerification(req.rawBody, hmac!)
  console.log('--------------------')
  console.log('verficiation was ', verified)
  // TODO: Fix validation of webhook
  // if (!verified) {
  //   console.log('Failed to verify the incoming request.')
  //   res.status(403).send('Could not verify request.')
  //   return
  // }
  next()
}
export default verifyRechargeWebhook

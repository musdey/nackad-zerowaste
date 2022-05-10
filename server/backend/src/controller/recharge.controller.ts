import { Handler, NextFunction, Request, Response } from 'express'
import fetch from 'node-fetch'
import User from '../models/User'
import { DepositStatus } from '../types'
import { Charge, Subscription, Webhook, WebhookCallResult } from '../types/recharge-types'
import depositcontroller from './deposit.controller'

const WEBHOOK_URL = 'https://api.rechargeapps.com/webhooks'
const MAIN_URL = 'https://api.rechargeapps.com/'
const API_TOKEN = process.env.RECHARGE_API_TOKEN || ''

const necessaryWebhooks = [
  { topic: 'subscription/created', address: 'https://app.nackad.at/api/v1/recharge-webhooks/subscription-created' },
  { topic: 'charge/paid', address: 'https://app.nackad.at/api/v1/recharge-webhooks/charge-paid' }
]

const webhookCall = async (method: 'GET' | 'POST', body?: string) => {
  const result = await fetch(WEBHOOK_URL, {
    method: method,
    headers: {
      'X-Recharge-Access-Token': API_TOKEN,
      'Content-Type': 'application/json'
    },
    body: body
  })
  let webhooks = undefined
  if (result.status === 200) {
    webhooks = await result.json()
  }
  return webhooks
}

const registerWebhooks = async () => {
  const webbhookResponse: WebhookCallResult | undefined = await webhookCall('GET')

  console.log('webhooks that exist')
  console.log(webbhookResponse)

  if (webbhookResponse) {
    necessaryWebhooks.forEach(async (necessary) => {
      let available = false
      webbhookResponse.webhooks.forEach((elem: Webhook) => {
        if (elem.topic === necessary.topic) {
          available = true
        }
      })
      if (!available) {
        const body = { topic: necessary.topic, address: necessary.address }
        const res: Webhook = await webhookCall('POST', JSON.stringify(body))
        console.log('Recharge webhook created')
        console.log(res)
      }
    })
  }
}

const chargePaid: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: Charge = await req.body()
    console.log('charge webhook received')
    console.log(data)

    const deposits = await depositcontroller.getDepositByRechargeUserId(data.customer_id.id)
    deposits.forEach(async (deposit) => {
      if (deposit.status === DepositStatus.OPEN) {
        deposit.status = DepositStatus.PAID
        deposit.paidDeposit = deposit.totalPrice
      }
      if (deposit.status === DepositStatus.PARTIALLYRETURNED) {
        deposit.status = DepositStatus.PARTIALLYPAID
        const value = parseInt(deposit.totalPrice) - parseInt(deposit.returnedDeposit)
        deposit.paidDeposit = value.toString()
      }
      await deposit.save()
    })
    return res.status(200).end()
  } catch (err) {
    return next(err)
  }
}

const updateDepositPrice = async (userId: string) => {
  const user = await User.findOne({ _id: userId })
  if (user) {
    const price = await depositcontroller.getTotalOpenDepositByUserObj(user)
    const result = await fetch(MAIN_URL + 'subscriptions/' + user.rechargeSubscriptionId, {
      method: 'PUT',
      headers: {
        'X-Recharge-Access-Token': API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: price })
    })
    console.log(result.status)
    console.log('Subscription from ' + user.email + ' has been set to EUR ' + price)
  }
}

const subscriptionCreated: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const data: Subscription = await req.body()
  console.log('charge webhook received')
  console.log(data)

  const user = await User.findOne({ email: data.email })
  if (user) {
    // Update new subscription
    const price = await depositcontroller.getTotalOpenDepositByUserObj(user)
    const result = await fetch(MAIN_URL + 'subscriptions/' + data.id, {
      method: 'PUT',
      headers: {
        'X-Recharge-Access-Token': API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: price })
    })
    console.log(result.status)
    console.log('Subscription from ' + data.email + ' has been set to EUR ' + price)

    // Cancel old subscription
    const allSubscriptionsByUserId = await fetch(MAIN_URL + 'subscriptions?customer_id=' + data.customer_id)
    const allSubscriptions: Subscription[] = await allSubscriptionsByUserId.json()
    let subscriptionToCancel: Subscription | undefined
    allSubscriptions.forEach((subscription) => {
      if (!subscriptionToCancel) {
        subscriptionToCancel = subscription
      } else {
        if (new Date(subscriptionToCancel.created_at) > new Date(subscription.created_at)) {
          subscriptionToCancel = subscription
        }
      }
    })
    const removedResult = await fetch(MAIN_URL + 'subscriptions/' + subscriptionToCancel?.id + '/cancel', {
      method: 'POST',
      headers: {
        'X-Recharge-Access-Token': API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cancellation_reason: 'New Subscription created', send_email: false })
    })
    console.log('Cancel subscription with id ' + subscriptionToCancel?.id + '. Result:' + removedResult.status)
    user.rechargeSubscriptionId = data.id
    user.rechargeCustomerId = data.customer_id
    await user.save()
  }

  try {
    return res.status(200).end()
  } catch (err) {
    return next(err)
  }
}

const rechargeController = {
  registerWebhooks,
  chargePaid,
  subscriptionCreated,
  updateDepositPrice
}
export default rechargeController

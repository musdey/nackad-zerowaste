import { Handler, NextFunction, Request, Response } from 'express'
import fetch from 'node-fetch'
import User from '../models/User'
import { DepositStatus } from '../types'
import { Charge, Subscription, Webhook, WebhookCallResult } from '../types/recharge-types'
import depositcontroller from './deposit.controller'
import deliveryController from './delivery.controller'

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

const updateSubscriptionChargeDate = async (subscriptionId: number, date: Date) => {
  // {"date": "2021-08-05"}
  const result = await fetch(MAIN_URL + 'subscriptions/' + subscriptionId + '/set_next_charge_date', {
    method: 'POST',
    headers: {
      'X-Recharge-Access-Token': API_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ date: date.toISOString().split('T')[0] })
  })
  console.log('Updating next subscription charge date:')
  console.log(result.status)
  console.log(result.statusText)
  console.log(result.body)
  console.log('----------------------------------')
}

const chargePaid: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: Charge = await req.body.charge
    console.log('chargePaid webhook received')
    console.log(JSON.stringify(data, null, 4))

    if (data.type === 'checkout') {
      return res.status(200).end
    }

    const deposits = await depositcontroller.getDepositByRechargeUserId(data.customer_id)
    deposits.forEach(async (deposit) => {
      if (deposit.status === DepositStatus.OPEN) {
        deposit.status = DepositStatus.PAID
        deposit.paidDeposit = deposit.totalPrice
      }
      if (deposit.status === DepositStatus.PARTIALLYRETURNED) {
        deposit.status = DepositStatus.PARTIALLYPAID
        const value = (parseInt(deposit.totalPrice) | 0) - (parseInt(deposit.returnedDeposit) | 0)
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
    console.log('updatedepositprice: ', price)
    if (price <= 0) {
      const result = await fetch(MAIN_URL + 'subscriptions/' + user.rechargeSubscriptionId + '/cancel', {
        method: 'POST',
        headers: {
          'X-Recharge-Access-Token': API_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cancellation_reason: 'Deposit fully returned' })
      })
      if (result.status == 200) {
        console.log('Subscription from ' + user.email + ' has been cancelled')
      } else {
        console.log('Error cancelling subscription from ' + user.email)
      }
    } else {
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
}

const subscriptionCreated: Handler = async (req: Request, res: Response, next: NextFunction) => {

  console.log('Subscription created webhook received!')
  try {
    console.log("Waiting for 5 seconds..")
    setTimeout(async () => {
      console.log("Executing subscriptioncreated.")
      const data: Subscription = await req.body.subscription

      const user = await User.findOne({ email: data.email })
      if (user) {
        // Update new subscription
        const price = await depositcontroller.getTotalOpenDepositByUserObj(user)
        console.log('Subscription price is: ' + price + '; data.id is: ' + data.id)
        const result = await fetch(MAIN_URL + 'subscriptions/' + data.id, {
          method: 'PUT',
          headers: {
            'X-Recharge-Access-Token': API_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ price: price, quantity: 1 })
        })
        console.log('Updating next subscription charge date:')
        console.log(result.status)
        console.log(result.statusText)
        console.log(result.body)
        console.log('----------------------------------')
        if (result.ok) {
          console.log('Subscription from ' + data.email + ' has been set to EUR ' + price)
        } else {
          console.log('Error setting subsription price of ' + data.email)
        }
        const orderDate = await deliveryController.getNextDeliveryDateForUser(user)
        if (orderDate) {
          await updateSubscriptionChargeDate(data.id, orderDate)
        } else {
          console.log('orderDate could not be retrieved')
        }
        // Cancel old subscription
        const allSubscriptionsByUserId = await fetch(
          MAIN_URL + 'subscriptions?customer_id=' + data.customer_id + '&status=ACTIVE',
          {
            method: 'GET',
            headers: {
              'X-Recharge-Access-Token': API_TOKEN,
              'Content-Type': 'application/json'
            }
          }
        )
        const body = await allSubscriptionsByUserId.json()
        const allSubscriptions: Subscription[] = body.subscriptions

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
        if (subscriptionToCancel && subscriptionToCancel.id !== data.id) {
          const removedResult = await fetch(MAIN_URL + 'subscriptions/' + subscriptionToCancel?.id + '/cancel', {
            method: 'POST',
            headers: {
              'X-Recharge-Access-Token': API_TOKEN,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cancellation_reason: 'New Subscription created', send_email: false })
          })
          if (removedResult.ok) {
            console.log('Cancel subscription with id ' + subscriptionToCancel?.id + '. Result:' + removedResult.status)
          } else {
            console.log('Error occured cancelling old subscription')
          }
        }

        user.rechargeSubscriptionId = data.id
        user.rechargeCustomerId = data.customer_id
        await user.save()
      }
    }, 5000)
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

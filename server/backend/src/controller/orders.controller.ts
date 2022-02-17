/* eslint-disable prefer-const */
import { Handler, NextFunction, Request, Response } from 'express'
import Address from '../types/address'
import Order from '../types/order'
import OrderModel from '../models/Order'
import UserModel from '../models/User'
import DepositItemModel, { IDepositItem } from '../models/DepositItem'
import Product from '../models/Product'
import DepositModel from '../models/Deposit'
import DeliveryModel from '../models/Delivery'
import DeliveryUpdate from '../types/deliveryupdate'
import Cancellation from '../types/cancellation'

// Webhook that is called when a new order is created on webshop
const createNewOrder: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Congratulations, a new order has been made!')
  const newOrder = req.body as Order

  // TODO: add delivery day and timeslot to newOrder!!

  const orderDatabase = await new OrderModel(newOrder).save()
  const shippingAddress = newOrder.shipping_address as Address

  let user = await UserModel.findOne({ shopifyUserId: newOrder.customer?.id })
  if (!user) {
    user = await new UserModel({
      shopifyUserId: newOrder.customer?.id,
      email: newOrder.customer?.email,
      address: shippingAddress,
      phoneNumber: newOrder.phone || newOrder.billing_address?.phone || newOrder.customer?.default_address?.phone || '',
      firstName: newOrder.customer?.first_name,
      lastName: newOrder.customer?.last_name
    }).save()
  }

  let depositItemArr: IDepositItem[] = []
  let totalPrice = 0
  await Promise.all(
    newOrder.line_items!.map(async (item) => {
      // Get DepositTypes for each ordered product
      const product = await Product.findOne({ shopifyId: item.product_id })
      console.log(product)
      let depositName = 'Deposit not set yet.'
      let depositPrice = '0'
      if (product?.deposit) {
        depositName = product?.deposit.split('-')[0]
        depositPrice = product?.deposit.split('-')[1]
      }

      const depoItem = await new DepositItemModel({
        amount: item.quantity,
        type: depositName,
        productName: item.title,
        pricePerItem: depositPrice
      }).save()
      totalPrice += parseInt(depositPrice!)
      depositItemArr.push(depoItem._id)
      console.log('depoitemid ' + depoItem._id)
    })
  )

  const totalPriceString = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    totalPrice / 100
  )
  // Create deposit object and fill with all data
  await new DepositModel({
    customer: user._id,
    order: orderDatabase,
    depositItems: depositItemArr!,
    totalPrice: totalPriceString
  }).save()
  await new DeliveryModel({ shopifyOrder: orderDatabase, address: shippingAddress }).save()
  return res.status(200).send('Public Content.')
}

// Webhook that is called if the fullfilment status of the order changes
const orderUpdates: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('order Delivered handler called')
  const update = req.body as DeliveryUpdate
  const currentDelivery = await DeliveryModel.findOne({ shopifyOrderId: update.order_id })
  if (currentDelivery) {
    currentDelivery.updates.push(update)
    if (update.shipment_status == 'out_for_delivery') {
      currentDelivery.status = 'INDELIVERY'
    } else if (update.shipment_status == 'delivered') {
      currentDelivery.status = 'DELIVERED'
    }
    console.log('orderid ' + update.order_id)
    console.log('id ' + update.id)
    console.log('Deliverystatus from delivery ' + update.order_id + 'is now ' + currentDelivery.status)
    await currentDelivery.save()
  }

  return res.status(200).send('Public Content.')
}

// Order cancelled webhook
const orderCancelled: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Cancel order handler has been calledcalled')
  const cancellation = req.body as Cancellation
  const currentDelivery = await DeliveryModel.findOne({ shopifyOrderId: cancellation.id })
  if (currentDelivery) {
    currentDelivery.updates.push(cancellation)
    currentDelivery.status = 'CANCELLED'
    console.log('Deliverystatus from delivery ' + cancellation.id + 'is now ' + currentDelivery.status)
    await currentDelivery.save()
  }

  return res.status(200).send('Public Content.')
}

export { createNewOrder, orderUpdates, orderCancelled }

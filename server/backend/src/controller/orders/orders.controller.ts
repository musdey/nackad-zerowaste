/* eslint-disable prefer-const */
import Order from '../../types/order'
import OrderModel from '../../models/Order'
import DeliveryModel from '../../models/Delivery'
import DeliveryUpdate from '../../types/deliveryupdate'
import Cancellation from '../../types/cancellation'

// Webhook that is called if the fullfilment status of the order changes
const orderUpdates = async (update: DeliveryUpdate) => {
  console.log('--------------------------order Delivered handler called')
  console.log(update)
  const currentDelivery = await DeliveryModel.findOne({ webShopOrderId: update.order_id })
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
}

// Order cancelled webhook
const orderCancelled = async (cancellation: Cancellation) => {
  console.log('Cancel order handler has been calledcalled')
  console.log(cancellation)
  const currentDelivery = await DeliveryModel.findOne({ webShopOrderId: cancellation.id })
  if (currentDelivery) {
    currentDelivery.updates.push(cancellation)
    currentDelivery.status = 'CANCELLED'
    console.log('Deliverystatus from delivery ' + cancellation.id + 'is now ' + currentDelivery.status)
    await currentDelivery.save()
  }
}

const getAll = async (shop: string) => {
  const order = await OrderModel.find({ shop })
  return order
}
const getFuture = async (shop: string) => {
  const order = await OrderModel.find({
    shop,
    deliveryDay: {
      $gte: new Date()
    }
  })
  return order
}

const getToday = async (shop: string) => {
  const order = await OrderModel.find({
    shop,
    deliveryDay: {
      $gte: new Date(new Date().setHours(2, 0, 0)),
      $lte: new Date(new Date().setHours(23, 59, 0))
    }
  })
  return order
}

const getCurrent = async (shop: string) => {
  const order = await OrderModel.find({
    shop,
    deliveryDay: {
      $gte: new Date(new Date().setHours(new Date().getHours() - 2)),
      $lte: new Date(new Date().setHours(new Date().getHours() + 2))
    }
  })
  return order
}

const getById = async (id: string, shop: string) => {
  const shopifyOrder = await OrderModel.findOne({ _id: id, shop })
  return shopifyOrder
}

const updateById = async (id: string, order: Order, shop: string) => {
  const shopifyOrder = await OrderModel.findOne({ _id: id, shop })
  if (shopifyOrder) {
    await shopifyOrder.update(order)
    await shopifyOrder.save()
  }
  //const shopifyOrder = await OrderModel.findByIdAndUpdate(id, order)
  return shopifyOrder
}

const orderController = {
  getById,
  updateById,
  orderUpdates,
  orderCancelled,
  getAll,
  getToday,
  getFuture,
  getCurrent
}
export default orderController

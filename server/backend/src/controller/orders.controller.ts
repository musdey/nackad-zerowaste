/* eslint-disable prefer-const */
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
import DeliverySlotModel from '../models/DeliverySlots'
import DepositTypeModel from '../models/DepositType'

// Webhook that is called when a new order is created on webshop
const createNewOrder = async (newOrder: Order) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  console.log(newOrder)
  let deliveryDayString = 'unset'
  let deliveryDay = new Date()
  let timeslot = 'unset'
  const arr = newOrder.note_attributes
  if (arr && arr.length > 0) {
    arr.forEach((data) => {
      if (data.name === 'timeslot') {
        timeslot = data.value
      }
      if (data.name === 'deliveryDay') {
        deliveryDayString = data.value
      }
    })
    const dateParts = deliveryDayString.split('-')
    deliveryDay = new Date(+dateParts[0], parseInt(dateParts[1]) - 1, +dateParts[2])
    deliveryDay.setHours(parseInt(timeslot.split('-')[0].split(':')[0]), 0, 0)
  }
  newOrder.timeslot = timeslot
  newOrder.deliveryDay = deliveryDay

  const shippingAddress = newOrder.shipping_address as Address
  const billingAddress = newOrder.billing_address as Address

  let user = await UserModel.findOne({ shopifyUserId: newOrder.customer?.id })
  if (!user) {
    user = await new UserModel({
      shopifyUserId: newOrder.customer?.id,
      email: newOrder.customer?.email,
      address: billingAddress,
      phoneNumber: newOrder.phone || newOrder.billing_address?.phone || newOrder.customer?.default_address?.phone || '',
      firstName: newOrder.customer?.first_name,
      lastName: newOrder.customer?.last_name
    }).save()
  }
  const exists = await OrderModel.exists({ shopifyOrderId: newOrder.id })
  console.log('exists', exists)
  if (exists) {
    return
  }

  let depositItemArr: IDepositItem[] = []
  let totalPrice = 0

  // async function dingser() {
  //   const dings = await Product.find().distinct('deposit')
  //   console.log(dings)
  // }
  // dingser()
  await Promise.all(
    newOrder.line_items!.map(async (item) => {
      // Get DepositTypes for each ordered product
      const product = await Product.findOne({ shopifyId: item.product_id })
      let depositName = 'Deposit not set yet.'
      let depositPrice = '0'
      if (product?.deposit) {
        depositName = product?.deposit.split('-')[0]
        depositPrice = product?.deposit.split('-')[1]
        const depoItem = await new DepositItemModel({
          amount: item.quantity,
          type: depositName,
          pricePerItem: depositPrice
        })
        item.deposit = {
          depositName,
          pricePerItem: depositPrice
        }
        totalPrice += parseInt(depositPrice!) * item.quantity!
        depositItemArr.push(depoItem)
      }
    })
  )

  const orderDatabase = await new OrderModel(newOrder)
  orderDatabase.user = user
  orderDatabase.shopifyOrderId = newOrder.id?.toString()
  await orderDatabase.save()

  let output: IDepositItem[] = []
  depositItemArr.map(async (item) => {
    const existing = output.filter(function (v, i) {
      return v.type == item.type
    })
    if (existing.length) {
      const existingIndex = output.indexOf(existing[0])
      output[existingIndex].amount += item.amount
    } else {
      output.push(item)
    }
  })

  output.forEach(async (item) => {
    const depositType = await DepositTypeModel.findOne({ name: item.type })
    if (depositType) {
      item.depositType = depositType
    }
    await item.save()
  })

  // const totalPriceString = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
  //   totalPrice / 100
  // )
  const totalPriceString = totalPrice.toString()
  // Create deposit object and fill with all data
  const tod = new Date()
  await new DepositModel({
    customer: user._id,
    order: orderDatabase,
    depositItems: output,
    totalPrice: totalPriceString,
    orderDate: deliveryDay,
    dueDate: new Date(tod.setDate(deliveryDay.getDate() + 21)),
    lastDueDate: new Date(tod.setDate(deliveryDay.getDate() + 90))
  }).save()

  // const dateParts = deliveryDay.split('.')
  // const day = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0])
  const deliverySlot = await DeliverySlotModel.findOne({
    deliveryDay: {
      $gte: deliveryDay!.setHours(2, 0, 0),
      $lte: deliveryDay!.setHours(23, 0, 0)
    },
    slotHours: timeslot
  })

  let delivery
  if (shippingAddress) {
    delivery = await new DeliveryModel({
      user,
      shopifyOrder: orderDatabase,
      address: shippingAddress,
      shopifyOrderId: newOrder.id
    })
  } else {
    delivery = await new DeliveryModel({
      user,
      type: 'PICKUP',
      shopifyOrder: orderDatabase,
      shopifyOrderId: newOrder.id
    })
  }

  deliverySlot?.deliveries?.push(delivery)
  const data = await deliverySlot?.save()
  if (data) {
    delivery.deliverySlot = data
  }
  delivery.slotHours = timeslot
  delivery.deliveryDay = deliveryDay!
  await delivery.save()
}

// Webhook that is called if the fullfilment status of the order changes
const orderUpdates = async (update: DeliveryUpdate) => {
  console.log('order Delivered handler called')
  console.log(update.order_id)
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
}

// Order cancelled webhook
const orderCancelled = async (cancellation: Cancellation) => {
  console.log('Cancel order handler has been calledcalled')
  console.log(cancellation)
  const currentDelivery = await DeliveryModel.findOne({ shopifyOrderId: cancellation.id })
  if (currentDelivery) {
    currentDelivery.updates.push(cancellation)
    currentDelivery.status = 'CANCELLED'
    console.log('Deliverystatus from delivery ' + cancellation.id + 'is now ' + currentDelivery.status)
    await currentDelivery.save()
  }
}

const getAll = async () => {
  const order = await OrderModel.find({})
  return order
}
const getFuture = async () => {
  const order = await OrderModel.find({
    deliveryDay: {
      $gte: new Date()
    }
  })
  return order
}

const getToday = async () => {
  console.log(new Date(new Date().setHours(2, 0, 0)))
  console.log(new Date(new Date().setHours(23, 59, 0)))

  const order = await OrderModel.find({
    deliveryDay: {
      $gte: new Date(new Date().setHours(2, 0, 0)),
      $lte: new Date(new Date().setHours(23, 59, 0))
    }
  })
  return order
}

const getCurrent = async () => {
  const order = await OrderModel.find({
    deliveryDay: {
      $gte: new Date(new Date().setHours(new Date().getHours() - 2)),
      $lte: new Date(new Date().setHours(new Date().getHours() + 2))
    }
  })
  return order
}

const getById = async (id: string) => {
  const shopifyOrder = await OrderModel.findOne({ _id: id })
  return shopifyOrder
}

const orderController = {
  getById,
  createNewOrder,
  orderUpdates,
  orderCancelled,
  getAll,
  getToday,
  getFuture,
  getCurrent
}
export default orderController

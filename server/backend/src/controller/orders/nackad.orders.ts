import Shop from '../../models/Shop'
import Address from '../../types/address'
import Order from '../../types/order'
import UserModel from '../../models/User'
import DepositItemModel, { IDepositItem } from '../../models/DepositItem'
import Product from '../../models/Product'
import DepositModel from '../../models/Deposit'
import DeliverySlotModel from '../../models/DeliverySlots'
import DepositTypeModel from '../../models/DepositType'
import OrderModel from '../../models/Order'
import DeliveryModel from '../../models/Delivery'

// Webhook that is called when a new order is created on webshop
const createNewNackadOrder = async (newOrder: Order) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (newOrder.test) {
    console.log('This was a test order! Returning ...')
    return
  }
  if (newOrder.source_name === 'subscription_contract') {
    console.log('Deposit charge. Skipping.')
    return
  }
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

  let user = await UserModel.findOne({
    $or: [{ shopifyUserId: newOrder.customer?.id + '' }, { webShopUserId: newOrder.customer?.id + '' }]
  })
  const mainShop = await Shop.findOne({ name: 'NACKAD' })
  if (!user) {
    user = await new UserModel({
      mainShop,
      webShopUserId: newOrder.customer?.id,
      email: newOrder.customer?.email,
      address: billingAddress,
      phoneNumber: newOrder.phone || newOrder.billing_address?.phone || newOrder.customer?.default_address?.phone || '',
      firstName: newOrder.customer?.first_name,
      lastName: newOrder.customer?.last_name
    }).save()
  }
  const exists = await OrderModel.exists({ webShopOrderId: newOrder.id })
  console.log('exists', exists)
  if (exists) {
    return
  }

  const depositItemArr: IDepositItem[] = []
  let totalPrice = 0

  // async function dingser() {
  //   const dings = await Product.find().distinct('deposit')
  //   console.log(dings)
  // }
  // dingser()
  const newLineItems = [] as Order['line_items']
  await Promise.all(
    newOrder.line_items!.map(async (item) => {
      // Get DepositTypes for each ordered product
      const product = await Product.findOne({ shopifyId: item.product_id + '' })
      let depositName = 'Deposit not set yet.'
      let depositPrice = '0'
      if (product?.imgUrl) {
        item.imgUrl = product.imgUrl
      }
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
      newLineItems!.push(item)
    })
  )
  newOrder.line_items = []
  newOrder.line_items = newLineItems
  newOrder.shop = mainShop!

  const orderDatabase = await new OrderModel(newOrder)
  orderDatabase.user = user
  orderDatabase.webShopOrderId = newOrder.id?.toString()
  await orderDatabase.save()

  const output: IDepositItem[] = []
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
    shop: mainShop,
    deliveryDay: {
      $gte: deliveryDay!.setHours(2, 0, 0),
      $lte: deliveryDay!.setHours(23, 0, 0)
    },
    slotHours: timeslot
  })

  let delivery
  if (shippingAddress) {
    delivery = await new DeliveryModel({
      shop: mainShop,
      user,
      webShopOrder: orderDatabase,
      address: shippingAddress,
      webShopOrderId: newOrder.id
    })
  } else {
    delivery = await new DeliveryModel({
      shop: mainShop,
      user,
      type: 'PICKUP',
      webShopOrder: orderDatabase,
      webShopOrderId: newOrder.id
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

export default createNewNackadOrder

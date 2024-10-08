import { URL } from 'url'
import Order from '../../types/order'
import Address from '../../types/address'
import Shop from '../../models/Shop'
import Customer from '../../types/customer'
import line_items from '../../types/lineItems'
import UserModel from '../../models/User'
import OrderModel from '../../models/Order'
import DeliverySlotModel from '../../models/DeliverySlots'
import DeliveryModel from '../../models/Delivery'
import DepositItemModel, { IDepositItem } from '../../models/DepositItem'
import { ShopwareOrder } from '../../types/ShopwareOrder'
import DepositModel from '../../models/Deposit'
import DepositTypeModel from '../../models/DepositType'
import { rexEatDepositCalculator, rexEatMissingBoxCalculator } from './helper'

const createNewRexEatOrder = async (newOrder: ShopwareOrder) => {
  console.log('Rexeat Order create called')

  const mainShop = await Shop.findOne({ name: 'REXEAT' })

  const order: Order = {}
  const shippingAddress: Address = {}
  const billingAddress: Address = {}
  const customer: Customer = {}
  const items: line_items[] = []

  // Setting up shipping address obj

  // console.log(newOrder)

  const shippingaddr = newOrder.Shopware.sOrderVariables.sUserData.shippingaddress

  shippingAddress.address1 = shippingaddr.street
  shippingAddress.address2 = shippingaddr.additionalAddressLine1 || shippingaddr.additional_address_line1 || null
  if (shippingaddr.additionalAddressLine2 || shippingaddr.additional_address_line2) {
    shippingAddress.address2 += ' ' + shippingaddr.additionalAddressLine2 || ' ' + shippingaddr.additional_address_line2
  }
  shippingAddress.city = shippingaddr.city
  shippingAddress.zip = shippingaddr.zipcode
  shippingAddress.company = shippingaddr.company
  shippingAddress.country = newOrder.Shopware.sOrderVariables.sUserData.additional.country.countryname
  shippingAddress.country_code = newOrder.Shopware.sOrderVariables.sUserData.additional.country.countryiso
  shippingAddress.first_name = shippingaddr.firstname
  shippingAddress.last_name = shippingaddr.lastname
  shippingAddress.name = shippingaddr.firstname + ' ' + shippingaddr.lastname
  shippingAddress.phone = shippingaddr.phone

  order.shipping_address = shippingAddress

  // Setting up billing address obj

  const billingAddr = newOrder.Shopware.sOrderVariables.sUserData.billingaddress
  billingAddress.address1 = billingAddr.street
  billingAddress.address2 = billingAddr.additionalAddressLine1 || billingAddr.additional_address_line1 || null
  billingAddress.city = billingAddr.city
  billingAddress.zip = billingAddr.zipcode
  billingAddress.company = billingAddr.company
  billingAddress.country = newOrder.Shopware.sOrderVariables.sUserData.additional.country.countryname
  billingAddress.country_code = newOrder.Shopware.sOrderVariables.sUserData.additional.country.countryiso
  billingAddress.first_name = billingAddr.firstname
  billingAddress.last_name = billingAddr.lastname
  billingAddress.name = billingAddr.firstname + ' ' + billingAddr.lastname
  billingAddress.phone = billingAddr.phone

  order.billing_address = billingAddress

  // Setting up customer obj

  const shopWareUser = newOrder.Shopware.sOrderVariables.sUserData.additional.user
  customer.first_name = shopWareUser.firstname
  customer.last_name = shopWareUser.lastname
  customer.email = shopWareUser.email
  customer.phone = billingAddr.phone || shippingaddr.phone
  customer.default_address = billingAddress

  order.customer = customer

  // Set up purcheased products obj

  const orderedProducts = newOrder.Shopware.sOrderVariables.sBasket.content

  const depositItemArr: IDepositItem[] = []
  let totalDepositPrice = 0

  await Promise.all(
    orderedProducts.map(async (product) => {
      let rexglas_gross = '0'
      let rexglas_klein = '0'
      if (product.additional_details) {
        if (product.additional_details.rexglas_gross) {
          rexglas_gross = product.additional_details.rexglas_gross
        }
        if (product.additional_details.rexglas_klein) {
          rexglas_klein = product.additional_details.rexglas_klein
        }
      }
      const smallGlasses = Number.parseInt(rexglas_klein)
      const bigGlasses = Number.parseInt(rexglas_gross)
      const calculatedDeposit = rexEatDepositCalculator(
        product.quantity,
        smallGlasses,
        bigGlasses,
        shippingAddress.zip || ''
      )

      calculatedDeposit.forEach(async (item) => {
        const depoItem = await new DepositItemModel({
          amount: item.amount,
          type: item.depositType,
          pricePerItem: item.pricePerItem
        })
        totalDepositPrice += item.pricePerItem * item.amount
        depositItemArr.push(depoItem)
      })

      const newLine: line_items = {}
      newLine.name = product.articlename
      if (calculatedDeposit.length > 0) {
        newLine.deposit = {
          depositName: calculatedDeposit[0].depositType,
          pricePerItem: calculatedDeposit[0].pricePerItem.toString()
        }
      }
      newLine.id = Number.parseInt(product.id)
      newLine.quantity = Number.parseInt(product.quantity)
      newLine.price = product.price
      if (product.image) {
        const url = new URL(product.image?.source)
        newLine.imgUrl = url.href
        const thumbnail = new URL(product.image.thumbnails[0].source)
        newLine.thumbnail = thumbnail.href
      }
      items.push(newLine)
    })
  )

  // Group deposit to avoid multple deposit items with same type
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

  const additionalDeposit = rexEatMissingBoxCalculator(output, shippingAddress.zip || '')
  await Promise.all(
    additionalDeposit.map(async (item) => {
      const depoItem = await new DepositItemModel({
        amount: item.amount,
        type: item.depositType,
        pricePerItem: item.pricePerItem
      })
      totalDepositPrice += item.pricePerItem * item.amount
      output.push(depoItem)
    })
  )

  const finalOutput: IDepositItem[] = []
  output.map(async (item) => {
    const existing = finalOutput.filter(function (v, i) {
      return v.type == item.type
    })
    if (existing.length) {
      const existingIndex = finalOutput.indexOf(existing[0])
      finalOutput[existingIndex].amount += item.amount
    } else {
      finalOutput.push(item)
    }
  })

  // Set deposit type to product itself in order

  finalOutput.forEach(async (item) => {
    const depositType = await DepositTypeModel.findOne({ name: item.type })
    if (depositType) {
      item.depositType = depositType
    }
    await item.save()
  })

  order.line_items = items

  // Add missing data
  order.shop = mainShop!
  order.timeslot = newOrder.slotHours
  order.webShopOrderId = newOrder.orderNumber
  order.webShopOrderNumber = newOrder.orderNumber
  order.note = newOrder.userComment || newOrder.Shopware.sOrderVariables.sComment
  order.name = order.webShopOrderNumber

  // Return if order already exists

  const exists = await OrderModel.exists({
    $and: [{ shop: mainShop }, { webShopOrderNumber: newOrder.orderNumber }]
  })

  if (exists) {
    console.log('Rexeat order with given number already exists', exists)
    return
  }

  // Check user and create if does not exists

  let user = await UserModel.findOne({ webShopCustomerNumber: shopWareUser?.customernumber })
  if (!user) {
    user = await new UserModel({
      mainShop,
      webShopUserId: shopWareUser?.id,
      email: shopWareUser?.email,
      address: billingAddress,
      phoneNumber: customer?.phone || billingAddr?.phone || shippingaddr?.phone || '',
      webShopCustomerNumber: shopWareUser?.customernumber,
      firstName: customer?.first_name,
      lastName: customer?.last_name
    }).save()
  }

  // Create and save order object

  const orderDatabase = await new OrderModel(order)
  orderDatabase.user = user
  await orderDatabase.save()

  // Choose deliverySlot

  let deliveryDay = new Date()
  const dateParts = newOrder.deliveryDay!.split('.')
  deliveryDay = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0])
  deliveryDay.setHours(parseInt(newOrder.slotHours!.split('-')[0].split(':')[0]), 0, 0)
  order.deliveryDay = deliveryDay

  const deliverySlot = await DeliverySlotModel.findOne({
    shop: mainShop,
    deliveryAreas: { $regex: shippingAddress.zip },
    deliveryDay: {
      $gte: deliveryDay!.setHours(2, 0, 0),
      $lte: deliveryDay!.setHours(23, 0, 0)
    },
    slotHours: newOrder?.slotHours
  })

  let delivery
  if (shippingAddress) {
    delivery = await new DeliveryModel({
      shop: mainShop,
      status: 'OPEN',
      user,
      webShopOrder: orderDatabase,
      address: shippingAddress,
      webShopOrderId: order.webShopOrderId
    })
  } else {
    delivery = await new DeliveryModel({
      shop: mainShop,
      status: 'OPEN',
      user,
      type: 'PICKUP',
      webShopOrder: orderDatabase,
      webShopOrderId: order.webShopOrderId
    })
  }

  deliverySlot?.deliveries?.push(delivery)
  const data = await deliverySlot?.save()
  if (data) {
    delivery.deliverySlot = data
  }
  delivery.slotHours = order.timeslot
  delivery.deliveryDay = deliveryDay!
  await delivery.save()

  // Create deposit object and fill with all data
  const totalPriceString = totalDepositPrice.toString()

  const tod = new Date(deliveryDay)
  await new DepositModel({
    customer: user._id,
    order: orderDatabase,
    depositItems: finalOutput,
    totalPrice: totalPriceString,
    orderDate: deliveryDay,
    dueDate: new Date(tod.setDate(tod.getDate() + 21)),
    lastDueDate: new Date(tod.setDate(tod.getDate() + 90))
  }).save()
}

export default createNewRexEatOrder

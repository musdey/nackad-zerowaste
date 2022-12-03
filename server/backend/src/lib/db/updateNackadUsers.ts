import DeliveryModel from '../../models/Delivery'
import OrderModel from '../../models/Order'
import Shop from '../../models/Shop'
import User from '../../models/User'

export const updateNackadUsers = async () => {
  const nackad = await Shop.findOne({ name: 'NACKAD' })
  if (!nackad) {
    console.log('No shop Nackad...')
    return
  }

  await User.updateMany({ mainShop: nackad })
  console.log('Updated all existing users.')
}

export const updateNackadOrders = async () => {
  const shop = await Shop.findOne({ name: 'NACKAD' })
  if (!shop) {
    console.log('No shop Nackad...')
    return
  }

  await OrderModel.updateMany({ shop })
  console.log('Updated all existing orders  .')
}

export const updateDeliveries = async () => {
  const shop = await Shop.findOne({ name: 'NACKAD' })
  if (!shop) {
    console.log('No shop Nackad...')
    return
  }

  await DeliveryModel.updateMany({ shop })
  console.log('Updated all existing deliveries  .')
}

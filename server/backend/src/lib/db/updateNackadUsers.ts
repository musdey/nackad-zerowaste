import OrderModel from '../../models/Order'
import Shop from '../../models/Shop'
import User from '../../models/User'

export const updateNackadUsers = async () => {
  const user = await User.findOne({ email: 'mustafa.cicek@live.at' })
  if (!user) {
    console.log('No user mustafa..')
    return
  }
  // Set customer role
  const nackad = await Shop.findOne({ name: 'NACKAD' })
  if (!nackad) {
    console.log('No shop Nackad...')
    return
  }

  if (!user.mainShop) {
    await User.updateMany({ mainShop: nackad })
    console.log('Updated all existing users.')
  } else {
    console.log('All existing users are already updated to Nackad')
  }
}

export const updateNackadOrders = async () => {
  const shop = await Shop.findOne({ name: 'NACKAD' })
  if (!shop) {
    console.log('No shop Nackad...')
    return
  }
  const user = await User.findOne({ email: 'mustafa.cicek@live.at' })
  if (!user) {
    console.log('No user mustafa..')
    return
  }
  const order = await OrderModel.findOne({ user })
  if (!order) {
    console.log('No order for user mustafa..')
    return
  }
  if (!order.shop) {
    await OrderModel.updateMany({ shop })
    console.log('Updated all existing orders  .')
  } else {
    console.log('All existing orders are already updated to Nackad')
  }
}

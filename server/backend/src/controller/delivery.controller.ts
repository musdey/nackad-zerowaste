import DeliveryModel from '../models/Delivery'
import User from '../models/User'

const getAll = async () => {
  const delivery = await DeliveryModel.find({}).populate('deliverySlot user')
  return delivery
}

const getAllWithStatus = async (status: 'OPEN' | 'INDELIVERY' | 'DELIVERED' | 'CANCELLED') => {
  const delivery = await DeliveryModel.find({ status: status }).populate('deliverySlot')
  return delivery
}

const getCurrent = async () => {
  const todayMorning = new Date(Date.now())
  todayMorning.setHours(0)
  todayMorning.setMinutes(0)
  const delivery = await DeliveryModel.find({
    deliveryDay: {
      $gte: todayMorning
    }
  }).populate('deliverySlot user')
  return delivery
}

const getTodays = async () => {
  const todayMorning = new Date(Date.now())
  todayMorning.setHours(0)
  todayMorning.setMinutes(0)
  const todayNight = Date.now()
  todayMorning.setHours(23)
  todayMorning.setMinutes(59)
  const delivery = await DeliveryModel.find({
    deliveryDay: {
      $gte: todayMorning,
      $lt: todayNight
    }
  }).populate('shopifyOrder')
  return delivery
}

const search = async (query: string) => {
  const regex = new RegExp(query, 'gm')
  const user = await User.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } },
      { 'address.address1': { $regex: regex } },
      { email: { $regex: regex } }
    ]
  })
  // TODO: limit delivery results
  const delivery = await DeliveryModel.find({
    user
  }).populate('deliverySlot user')
  return delivery
}

const deliveryController = { search, getAll, getAllWithStatus, getCurrent, getTodays }

export default deliveryController

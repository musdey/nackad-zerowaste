import DeliveryModel from '../models/Delivery'

const getAll = async () => {
  const delivery = await DeliveryModel.find({})
  return delivery
}

const getAllWithStatus = async (status: string) => {
  const delivery = await DeliveryModel.find({ status })
  return delivery
}

const getCurrent = async () => {
  const delivery = await DeliveryModel.find({ $or: [{ status: 'OPEN' }, { status: 'INDELIVERY' }] })
  return delivery
}

const getTodays = async () => {
  const todayMorning = new Date()
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

const deliveryController = { getAll, getAllWithStatus, getCurrent, getTodays }

export default deliveryController

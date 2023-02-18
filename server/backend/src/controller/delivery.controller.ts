import DeliveryModel from '../models/Delivery'
import { IShop } from '../models/Shop'
import User from '../models/User'

const getAll = async (shop: string) => {
  const delivery = await DeliveryModel.find({ shop }).populate('deliverySlot user')
  return delivery
}

const getAllWithStatus = async (status: 'OPEN' | 'INDELIVERY' | 'DELIVERED' | 'CANCELLED', shop: string) => {
  const delivery = await DeliveryModel.find({ status: status, shop }).populate('deliverySlot')
  return delivery
}

const getCurrent = async (shop: string) => {
  const todayMorning = new Date(Date.now())
  todayMorning.setHours(0)
  todayMorning.setMinutes(0)
  const delivery = await DeliveryModel.find({
    shop,
    deliveryDay: {
      $gte: todayMorning
    }
  }).populate('deliverySlot user')
  return delivery
}

const getTodays = async (shop: string) => {
  const todayMorning = new Date(Date.now())
  todayMorning.setHours(0)
  todayMorning.setMinutes(0)
  const todayNight = Date.now()
  todayMorning.setHours(23)
  todayMorning.setMinutes(59)
  const delivery = await DeliveryModel.find({
    shop,
    deliveryDay: {
      $gte: todayMorning,
      $lt: todayNight
    }
  }).populate('shopifyOrder')
  return delivery
}

const search = async (query: string, shop: string) => {
  const regex = new RegExp(query, 'gm')
  const user = await User.find({
    mainShop: shop,
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

const updateStatusById = async (id: string, status: 'OPEN' | 'PACKED' | 'INDELIVERY' | 'DELIVERED', shop: string) => {
  const delivery = await DeliveryModel.findOne({ _id: id, shop })
  if (delivery) {
    delivery.status = status
    await delivery.save()
  }
  return delivery
}

const getOne = async (id: string, shop: string) => {
  const delivery = await DeliveryModel.findOne({ _id: id, shop })
  return delivery
}

const addImageToDelivery = async (id: string, imagePath: string, shop: string) => {
  const delivery = await DeliveryModel.findOne({ _id: id, shop })
  if (delivery) {
    delivery.images.push(imagePath)
    await delivery.save()
  }
  return delivery
}

const removeImageFromDelivery = async (id: string, imagePath: string, shop: string) => {
  const delivery = await DeliveryModel.findOne({ _id: id, shop })
  if (delivery) {
    const index = delivery.images.findIndex((image) => image === imagePath)
    if (!index) return delivery
    delivery.images.splice(index, 1)
    await delivery.save()
  }
  return delivery
}

const deliveryController = {
  updateStatusById,
  search,
  getAll,
  getAllWithStatus,
  getCurrent,
  getTodays,
  getOne,
  addImageToDelivery,
  removeImageFromDelivery
}

export default deliveryController

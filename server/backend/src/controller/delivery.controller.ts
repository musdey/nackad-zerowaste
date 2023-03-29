import DeliveryModel from '../models/Delivery'
import User, { IUser } from '../models/User'

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
  todayMorning.setHours(3)
  todayMorning.setMinutes(0)
  const delivery = await DeliveryModel.find({
    shop,
    deliveryDay: {
      $gte: todayMorning
    }
  }).populate('deliverySlot user')

  const sorted = delivery.sort((a: any, b: any) => {
    // sort by deliveryDay
    if (a.deliverySlot.deliveryDay && b.deliverySlot.deliveryDay) {
      if (a.deliverySlot.deliveryDay < b.deliverySlot.deliveryDay) {
        return -1
      } else if (a.deliverySlot.deliveryDay > b.deliverySlot.deliveryDay) {
        return 1
      } else {
        // sort by vehicle/deliverySlot
        if (a.deliverySlot._id > b.deliverySlot._id) {
          return -1
        } else if (a.deliverySlot._id < b.deliverySlot._id) {
          return 1
        } else {
          // sort by postalCode
          if (a.address.zip <= b.address.zip) {
            return -1
          } else {
            return 1
          }
        }
      }
    } else {
      return 0
    }
  })

  const grouped: any[] = []

  // group by sorted.deliveryDay
  sorted.forEach((delivery: any) => {
    const deliveryDay = delivery.deliveryDay
    const index = grouped.findIndex((group: any) => group.deliveryDay.toString() == deliveryDay.toString())

    if (index === -1) {
      grouped.push({
        deliveryDay,
        deliveries: [delivery]
      })
    } else {
      grouped[index].deliveries.push(delivery)
    }
  })

  const groupedDeliveries: any[] = []

  grouped.forEach((delivery) => {
    const deliveryDay = delivery.deliveryDay

    // Find or create the delivery day group
    let deliveryDayGroup = groupedDeliveries.find((group) => group.deliveryDay === deliveryDay)
    if (!deliveryDayGroup) {
      deliveryDayGroup = { deliveryDay, vehicles: [] }
      groupedDeliveries.push(deliveryDayGroup)
    }

    // Group the deliveries by vehicle
    delivery.deliveries.forEach((deliveryItem: any) => {
      const vehicleId = deliveryItem.deliverySlot.vehicleId

      // Find or create the vehicle group
      let vehicleGroup = deliveryDayGroup.vehicles.find((group: any) => group.vehicleId === vehicleId)
      if (!vehicleGroup) {
        vehicleGroup = { vehicleId, deliveries: [] }
        deliveryDayGroup.vehicles.push(vehicleGroup)
      }

      // Add the delivery to the vehicle group
      vehicleGroup.deliveries.push(deliveryItem)
    })
  })

  // sort the nested vehicles by vehicleId
  groupedDeliveries.forEach((deliveryDayGroup) => {
    deliveryDayGroup.vehicles.sort((a: any, b: any) => {
      if (a.vehicleId < b.vehicleId) {
        return -1
      } else if (a.vehicleId > b.vehicleId) {
        return 1
      } else {
        return 0
      }
    })
  })

  return groupedDeliveries
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
    delivery.images.unshift(imagePath)
    await delivery.save()
  }
  return delivery
}

const removeImageFromDelivery = async (id: string, imagePath: string, shop: string) => {
  const delivery = await DeliveryModel.findOne({ _id: id, shop })
  if (delivery) {
    const index = delivery.images.findIndex((image) => image === imagePath)
    if (index > -1) delivery.images.splice(index, 1)
    await delivery.save()
  }
  return delivery
}

const getNextDeliveryDateForUser = async (user: IUser) => {
  const delivery = await DeliveryModel.findOne({ user, deliveryDay: { $gt: new Date().toISOString() } })
  return delivery?.deliveryDay
}

const deliveryController = {
  getNextDeliveryDateForUser,
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

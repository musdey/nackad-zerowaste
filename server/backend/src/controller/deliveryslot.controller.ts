/* eslint-disable prefer-const */
import DeliverySlotModel, { IDeliverySlot } from '../models/DeliverySlots'
import Shop, { IShop } from '../models/Shop'
import ShopSettings from '../models/ShopSettings'
import User from '../models/User'
import { SlotDetails, VehicleConfig } from '../types/shopconfig'

const getRexeatSlotsPublic = async () => {
  // Show deliveryslots from friday to friday for the week after
  let startDate = new Date()
  const today = startDate.getDay() // 5 is friday
  const currentTime = startDate.getTime()
  const threshold = new Date().setHours(11, 0, 0, 0)

  startDate.setDate(startDate.getDate() + (7 - today)) // Set date to sunday
  let endDate = new Date(startDate)

  if (today < 5 || (today == 5 && currentTime < threshold)) {
    // Until friday 11am show next week
    // Show next week
    endDate.setDate(endDate.getDate() + 7)
    console.log(startDate)
    console.log(endDate)
  } else {
    // After friday 12pm (midday) show the week after next week
    // Show week after next week
    startDate.setDate(startDate.getDate() + 7)
    endDate.setDate(endDate.getDate() + 14)
  }
  const shop = await Shop.findOne({ name: 'REXEAT' })
  const deliverySlots = await DeliverySlotModel.find({
    shop,
    deliveryDay: {
      $gte: startDate,
      $lte: endDate
    }
  })
    .select('-_id -lastUpdatedFrom')
    .populate('deliveries')

  const sorted = deliverySlots.sort((a: any, b: any) => {
    if (a.vehicleId > b.vehicleId) {
      if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
        return -1
      } else {
        return 1
      }
    } else {
      if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
        return 1
      } else {
        return -1
      }
    }
  })

  return sorted
}

// Get Nackad deliveryslots
const getDeliverySlotsPublic = async () => {
  const shop = await Shop.findOne({ name: 'NACKAD' })
  const settings = await ShopSettings.findOne({ shop })

  // Show deliverySlots ealierst 2hours before
  let date = new Date()
  const currentTime = date.getTime()
  const threshold = new Date().setHours(12, 30, 0, 0)
  if (currentTime > threshold) {
    date.setHours(22, 0, 0)
  } else {
    date.setHours(date.getHours() + 3, 0, 0)
  }

  const deliverySlots = await DeliverySlotModel.find({
    shop,
    deliveryDay: {
      $gte: date
    }
  }).select('-_id -lastUpdatedFrom -shop')

  const sorted = deliverySlots.sort((a: any, b: any) => {
    if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
      return 1
    } else {
      return -1
    }
  })
  return sorted
}

const getDeliverySlotsManagement = async (shop: string) => {
  const deliverySlots = await DeliverySlotModel.find({
    shop,
    deliveryDay: {
      $gte: new Date()
    }
  })

  const sorted = deliverySlots.sort((a: any, b: any) => {
    if (a.vehicleId > b.vehicleId) {
      if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
        return -1
      } else {
        return 1
      }
    } else {
      if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
        return 1
      } else {
        return -1
      }
    }
  })

  return sorted
}

const createNackadSlots = async () => {
  const shop = await Shop.findOne({ name: 'NACKAD' })
  const shopSetting = await ShopSettings.findOne({ shop: shop!._id })
  const settingObj = shopSetting

  if (!settingObj) {
    return 'error'
  }

  const deliverySlots = settingObj.deliverySlots

  let today = new Date().getDay() // 0-6
  let currentDayMorning = new Date()
  let currentDayNight = new Date()
  currentDayMorning.setHours(2, 0, 0)
  currentDayNight.setHours(22, 0, 0)

  // Iterate how mandy days in advance you want to show the deliveryslots
  for (let i = 0; i < settingObj.showSlotDaysInAdvance; i++) {
    let dayObject
    switch (
      today // Begin with todays config
    ) {
      case 1:
        dayObject = deliverySlots.monday
        break
      case 2:
        dayObject = deliverySlots.tuesday
        break
      case 3:
        dayObject = deliverySlots.wednesday
        break
      case 4:
        dayObject = deliverySlots.thursday
        break
      case 5:
        dayObject = deliverySlots.friday
        break
      case 6:
        dayObject = deliverySlots.saturday
        break
      case 0:
        dayObject = deliverySlots.sunday
        break
      default:
        dayObject = deliverySlots.sunday
        break
    }

    // Check if there is a config for given day
    if (dayObject) {
      const slots = await DeliverySlotModel.find({
        shop,
        deliveryDay: {
          $gte: currentDayMorning,
          $lt: currentDayNight
        }
      })

      // Only create slots, if there are no slots for given day
      if (slots.length == 0) {
        dayObject.forEach(async (vehicleObject: VehicleConfig) => {
          const { slots, vehicle } = vehicleObject

          slots?.forEach((config) => {
            // E.g 15:00-20:00
            let from = parseInt(config.hours.split('-')[0].split(':')[0])
            const to = parseInt(config.hours.split('-')[1].split(':')[0])

            while (from != to) {
              const toSlot = from + 1
              const date = new Date(currentDayMorning).setHours(from, 0, 0)
              new DeliverySlotModel({
                vehicleId: vehicle,
                shop,
                deliveryDay: new Date(date),
                slotHours: `${from}:00-${toSlot}:00`,
                maxSlotSize: config.maxDeliveries,
                deliveryAreas: config.deliveryAreas
              }).save()
              from++
            }
          })
        })
      }
    }
    currentDayMorning.setDate(currentDayMorning.getDate() + 1)
    currentDayNight.setDate(currentDayNight.getDate() + 1)
    if (today == 6) {
      today = 0
    } else {
      today++
    }
  }

  return 'ok'
}

const createRexeatSlots = async () => {
  const shop = await Shop.findOne({ name: 'REXEAT' })
  const settingObj = await ShopSettings.findOne({ shop: shop!._id })

  if (!settingObj) {
    return 'error'
  }

  const deliverySlots = settingObj.deliverySlots

  let today = new Date().getDay() // 0-6
  let currentDayMorning = new Date()
  let currentDayNight = new Date()
  currentDayMorning.setHours(2, 0, 0)
  currentDayNight.setHours(22, 0, 0)
  for (let i = 0; i < settingObj.showSlotDaysInAdvance; i++) {
    let dayObject
    switch (today) {
      case 1:
        dayObject = deliverySlots.monday
        break
      case 2:
        dayObject = deliverySlots.tuesday
        break
      case 3:
        dayObject = deliverySlots.wednesday
        break
      case 4:
        dayObject = deliverySlots.thursday
        break
      case 5:
        dayObject = deliverySlots.friday
        break
      case 6:
        dayObject = deliverySlots.saturday
        break
      case 0:
        dayObject = deliverySlots.sunday
        break
      default:
        dayObject = deliverySlots.sunday
        break
    }
    if (dayObject) {
      const slots = await DeliverySlotModel.find({
        shop,
        deliveryDay: {
          $gte: currentDayMorning,
          $lt: currentDayNight
        }
      })
      if (slots.length == 0) {
        dayObject.forEach(async (vehicleObject: VehicleConfig) => {
          const { slots, vehicle } = vehicleObject

          slots?.forEach((config: SlotDetails) => {
            let from = parseInt(config.hours.split('-')[0].split(':')[0])
            const to = parseInt(config.hours.split('-')[1].split(':')[0])
            const date = new Date(currentDayMorning).setHours(from, 0, 0)
            new DeliverySlotModel({
              shop,
              deliveryDay: new Date(date),
              deliveryAreas: config.deliveryAreas,
              slotHours: `${from}:00-${to}:00`,
              maxSlotSize: config.maxDeliveries,
              vehicleId: vehicle
            }).save()
          })
        })
      }
    }

    currentDayMorning.setDate(currentDayMorning.getDate() + 1)
    currentDayNight.setDate(currentDayNight.getDate() + 1)
    if (today == 6) {
      today = 0
    } else {
      today++
    }
  }

  return 'ok'
}

const updateSlot = async (deliverySlotId: string, userId: string, type: 'ADD' | 'REMOVE', shop: string) => {
  const slot = await DeliverySlotModel.findOne({
    shop,
    _id: deliverySlotId
  })
  if (!slot) {
    throw new Error('No open slots to remove.')
  } else {
    if (type == 'ADD') {
      slot.maxSlotSize = slot.maxSlotSize + 1
    } else {
      if (slot.maxSlotSize <= slot.deliveries!.length) {
        throw new Error('No open slots to remove.')
      } else {
        slot.maxSlotSize = slot.maxSlotSize - 1
      }
    }
    const user = await User.findById({ _id: userId }).select('-role -password')
    if (user) {
      slot.lastUpdatedFrom.push({ date: new Date(), user: user })
    }
    const result = await slot.save()

    return result
  }
}

const updateById = async (id: string, deliverySlot: IDeliverySlot, shop: string) => {
  const slot = await DeliverySlotModel.findOne({ _id: id, shop })
  if (slot) {
    await slot.updateOne(deliverySlot)
    await slot.save()
  }
  return slot
}

const deliverySlotController = {
  getRexeatSlotsPublic,
  createNackadSlots,
  createRexeatSlots,
  getDeliverySlotsManagement,
  getDeliverySlotsPublic,
  updateSlot,
  updateById
}
export default deliverySlotController

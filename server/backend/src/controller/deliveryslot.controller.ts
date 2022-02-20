/* eslint-disable prefer-const */
import DeliverySlotModel from '../models/DeliverySlots'
import ShopSettings, { IShopSettings } from '../models/ShopSettings'

const getDeliverySlots = async () => {
  const todayMorning = new Date()
  todayMorning.setHours(0)
  todayMorning.setMinutes(0)
  const deliverySlotsOfNextThreeDays = await DeliverySlotModel.find({
    deliveryDay: {
      $gte: todayMorning
    }
  })
  return deliverySlotsOfNextThreeDays
}

const createDeliverySlots = async () => {
  const shopSetting = await ShopSettings.find({})
  const settingObj = shopSetting[0]

  if (!settingObj) {
    return 'error'
  }

  const deliveryHours = settingObj.deliveryHours

  let today = new Date().getDay() // 0-6
  let currentDayMorning = new Date()
  let currentDayNight = new Date()
  currentDayMorning.setHours(0)
  currentDayMorning.setMinutes(0)
  currentDayNight.setHours(23)
  currentDayNight.setMinutes(59)
  console.log('today  ', today)
  for (let i = 0; i < 3; i++) {
    let hoursString
    switch (today) {
      case 1:
        hoursString = deliveryHours.monday
        break
      case 2:
        hoursString = deliveryHours.tuesday
        break
      case 3:
        hoursString = deliveryHours.wednesday
        break
      case 4:
        hoursString = deliveryHours.thursday
        break
      case 5:
        hoursString = deliveryHours.friday
        break
      case 6:
        hoursString = deliveryHours.saturday
        break
      case 0:
        hoursString = deliveryHours.sunday
        break
      default:
        hoursString = deliveryHours.sunday
        break
    }
    if (!hoursString?.includes('closed')) {
      const slots = await DeliverySlotModel.find({
        deliveryDay: {
          $gte: currentDayMorning,
          $lt: currentDayNight
        }
      })
      if (slots.length == 0) {
        // E.g 15:00-20:00
        let from = parseInt(hoursString!.split('-')[0].split(':')[0])
        const to = parseInt(hoursString!.split('-')[1].split(':')[0])

        while (from != to) {
          const toSlot = from + 1
          new DeliverySlotModel({
            deliveryDay: currentDayMorning,
            slotHours: `${from}:00-${toSlot}:00`
          }).save()
          from++
        }
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

// const updateDeliverySlot = async () => {}

const deliverySlotController = { createDeliverySlots }
export default deliverySlotController

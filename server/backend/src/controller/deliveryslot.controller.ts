/* eslint-disable prefer-const */
import DeliverySlotModel from '../models/DeliverySlots'
import ShopSettings from '../models/ShopSettings'
import User from '../models/User'

const getDeliverySlotsPublic = async () => {
  const settings = await ShopSettings.findOne({})

  // Show deliverySlots ealierst 2hours before
  let date = new Date()
  date.setHours(date.getHours() + 3)
  //date.setMinutes(date.getHours() + 15)

  const deliverySlots = await DeliverySlotModel.find({
    deliveryDay: {
      $gt: date
    }
  })
    .select('-_id -lastUpdatedFrom')
    .populate('deliveries')

  let newArr: object[] = []

  deliverySlots.forEach((data) => {
    let suggestion: string[] = []
    // data.deliveries?.forEach((delivery) => {
    //   const zip = delivery.address.zip
    //   if (zip && !suggestion.includes(zip)) {
    //     suggestion.push(zip)
    //   }
    // })

    const newObj = {
      deliveryDay: data.deliveryDay,
      slotHours: data.slotHours,
      maxSlotSize: data.maxSlotSize,
      available: data.maxSlotSize - data.deliveries!.length,
      suggestions:
        settings!.extraSlots * settings!.vehicles + data.maxSlotSize - data.deliveries!.length > 0 ? suggestion : []
    }
    newArr.push(newObj)
  })
  const sorted = newArr.sort((a: any, b: any) => {
    if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
      return 1
    } else {
      return -1
    }
  })
  return sorted
}

const getDeliverySlotsManagement = async () => {
  const deliverySlots = await DeliverySlotModel.find({
    deliveryDay: {
      $gte: new Date()
    }
  })
  return deliverySlots
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
  currentDayMorning.setHours(2, 0, 0)
  currentDayNight.setHours(22, 0, 0)
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
            deliveryDay: new Date(currentDayMorning).setHours(from, 0, 0),
            slotHours: `${from}:00-${toSlot}:00`,
            maxSlotSize: settingObj.slotsPerVehicle * settingObj.vehicles
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

const updateSlot = async (deliverySlotId: string, userId: string, type: 'ADD' | 'REMOVE') => {
  const slot = await DeliverySlotModel.findOne({
    _id: {
      $eq: deliverySlotId
    }
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
    await slot.save()

    return slot
  }
}

const deliverySlotController = {
  createDeliverySlots,
  getDeliverySlotsManagement,
  getDeliverySlotsPublic,
  updateSlot
}
export default deliverySlotController

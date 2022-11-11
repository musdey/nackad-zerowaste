/* eslint-disable prefer-const */
import DeliverySlotModel from '../models/DeliverySlots'
import Shop from '../models/Shop'
import ShopSettings from '../models/ShopSettings'
import User from '../models/User'

const getRexeatSlotsPublic = async () => {
  // Show deliveryslots from friday to friday for the week after
  let startDate = new Date()
  let endDate = new Date()
  const today = startDate.getDay() // 5 is friday
  const currentTime = startDate.getTime()
  const threshold = new Date().setHours(11, 0, 0, 0)

  console.log(today)
  console.log(new Date(currentTime))
  console.log(new Date(threshold))

  startDate.setDate(startDate.getDate() + (7 - today)) // Set date to sunday
  if (today <= 5 && currentTime < threshold) {
    // Show next week
    endDate.setDate(startDate.getDate() + 7)
  } else {
    // Show week after next week
    startDate.setDate(startDate.getDate() + 7)
    endDate.setDate(startDate.getDate() + 14)
  }
  console.log(startDate)
  console.log(endDate)

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
    if (new Date(a.deliveryDay).getTime() > new Date(b.deliveryDay).getTime()) {
      return 1
    } else {
      return -1
    }
  })
  return sorted
}

const getDeliverySlotsPublic = async () => {
  const settings = await ShopSettings.findOne({})

  // Show deliverySlots ealierst 2hours before
  let date = new Date()
  const currentTime = date.getTime()
  const threshold = new Date().setHours(11, 30, 0, 0)
  if (currentTime > threshold) {
    date.setHours(22, 0, 0)
  } else {
    date.setHours(date.getHours() + 3, 0, 0)
  }

  //date.setMinutes(date.getHours() + 15)

  const deliverySlots = await DeliverySlotModel.find({
    deliveryDay: {
      $gte: date
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
  const shop = await Shop.findOne({ name: 'NACKAD' })
  const shopSetting = await ShopSettings.findOne({ shop: shop!._id })
  const settingObj = shopSetting

  if (!settingObj) {
    return 'error'
  }

  const deliveryHours = settingObj.deliveryHours

  let today = new Date().getDay() // 0-6
  let currentDayMorning = new Date()
  let currentDayNight = new Date()
  currentDayMorning.setHours(2, 0, 0)
  currentDayNight.setHours(22, 0, 0)
  for (let i = 0; i < settingObj.showSlotDaysInAdvance; i++) {
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
    if (hoursString && !hoursString?.includes('closed')) {
      const slots = await DeliverySlotModel.find({
        shop,
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
          const date = new Date(currentDayMorning).setHours(from, 0, 0)
          new DeliverySlotModel({
            shop,
            deliveryDay: new Date(date),
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

const createRexeatSlots = async () => {
  const shop = await Shop.findOne({ name: 'REXEAT' })
  const settingObj = await ShopSettings.findOne({ shop: shop!._id })

  if (!settingObj) {
    return 'error'
  }

  const deliveryHours = settingObj.bigSlots

  let today = new Date().getDay() // 0-6
  let currentDayMorning = new Date()
  let currentDayNight = new Date()
  currentDayMorning.setHours(2, 0, 0)
  currentDayNight.setHours(22, 0, 0)
  for (let i = 0; i < settingObj.showSlotDaysInAdvance; i++) {
    let hoursStringArr
    switch (today) {
      case 1:
        if (deliveryHours.monday) {
          hoursStringArr = deliveryHours.monday
        }
        break
      case 2:
        if (deliveryHours.tuesday) {
          hoursStringArr = deliveryHours.tuesday
        }
        break
      case 3:
        if (deliveryHours.wednesday) {
          hoursStringArr = deliveryHours.wednesday
        }
        break
      case 4:
        if (deliveryHours.thursday) {
          hoursStringArr = deliveryHours.thursday
        }
        break
      case 5:
        if (deliveryHours.friday) {
          hoursStringArr = deliveryHours.friday
        }
        break
      case 6:
        if (deliveryHours.saturday) {
          hoursStringArr = deliveryHours.saturday
        }
        break
      case 0:
        if (deliveryHours.sunday) {
          hoursStringArr = deliveryHours.sunday
        }
        break
      default:
        if (deliveryHours.sunday) {
          hoursStringArr = deliveryHours.sunday
        }
        break
    }
    if (hoursStringArr) {
      const slots = await DeliverySlotModel.find({
        shop,
        deliveryDay: {
          $gte: currentDayMorning,
          $lt: currentDayNight
        }
      })
      if (!slots || slots.length == 0) {
        // E.g 15:00-20:00
        // let from = parseInt(hoursString!.split('-')[0].split(':')[0])
        // const to = parseInt(hoursString!.split('-')[1].split(':')[0])

        hoursStringArr.forEach(async (bigSlot) => {
          let from = parseInt(bigSlot!.split('-')[0].split(':')[0])
          const to = parseInt(bigSlot!.split('-')[1].split(':')[0])
          const date = new Date(currentDayMorning).setHours(from, 0, 0)
          new DeliverySlotModel({
            shop,
            deliveryDay: new Date(date),
            slotHours: `${from}:00-${to}:00`,
            maxSlotSize: settingObj.slotsPerVehicle
          }).save()
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
  getRexeatSlotsPublic,
  createDeliverySlots,
  createRexeatSlots,
  getDeliverySlotsManagement,
  getDeliverySlotsPublic,
  updateSlot
}
export default deliverySlotController

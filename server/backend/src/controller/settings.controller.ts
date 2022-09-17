import DepositModel from '../models/Deposit'
import ShopSettings, { DeliveryHours } from '../models/ShopSettings'

const getSettings = async () => {
  const settings = await ShopSettings.find({}).select('-slotsPerVehicle -vehicles')
  if (!settings || settings.length === 0) {
    return 'empty'
  }
  return settings[0]
}

const getSettingsAdmin = async () => {
  const settings = await ShopSettings.find({})
  if (!settings || settings.length === 0) {
    return 'empty'
  }
  return settings[0]
}

const updateSettings = async (
  areas: string,
  hours: object,
  slotsPerVehicle: number,
  vehicles: number,
  extraSlots: number,
  showSlotDaysInAdvance: number
) => {
  const settings = await ShopSettings.find({})
  if (!settings || settings.length === 0) {
    return await new ShopSettings({
      deliveryAreas: areas,
      deliveryHours: hours,
      slotsPerVehicle,
      vehicles,
      showSlotDaysInAdvance
    }).save()
  }
  const oneSetting = settings[0]
  oneSetting.deliveryAreas = areas
  oneSetting.deliveryHours = hours as DeliveryHours
  oneSetting.slotsPerVehicle = slotsPerVehicle
  oneSetting.vehicles = vehicles
  oneSetting.extraSlots = extraSlots
  oneSetting.showSlotDaysInAdvance = showSlotDaysInAdvance
  const updated = await oneSetting.save()
  return updated
}

const getStatistics = async () => {
  const deposits = await DepositModel.find({ status: { $ne: 'RETURNED' } }).populate('depositItems')

  let totalDeposit = 0
  const result: any[] = []
  deposits.forEach((deposit) => {
    const returnedDep = parseInt(deposit.returnedDeposit)
    const paidDep = parseInt(deposit.paidDeposit)
    totalDeposit = totalDeposit + parseInt(deposit.totalPrice) - (returnedDep || 0) - (paidDep || 0)
    deposit.depositItems.forEach((item) => {
      let existing
      if (item.depositType) {
        existing = result.filter((v) => v?.depositType?._id === item?.depositType?._id)
      } else {
        existing = result.filter((v) => v?.type === item.type)
      }
      if (existing.length > 0) {
        const existingIndex = result.indexOf(existing[0])
        result[existingIndex].amount = parseInt(result[existingIndex].amount) + item.amount
        result[existingIndex].returned = parseInt(result[existingIndex].returned) + item.returned
      } else {
        const copiedItem = {
          _id: item._id,
          type: item.type,
          amount: item.amount,
          returned: item.returned,
          depositType: item.depositType,
          pricePerItem: item.pricePerItem
        }
        result.push(copiedItem)
      }
    })
  })

  const totalDepositItems = result
  const aggregatedData = { totalDeposit, totalDepositItems }
  return aggregatedData
}

const settingsController = { getSettings, updateSettings, getSettingsAdmin, getStatistics }
export default settingsController

/*
{
	"deliveryAreas":"1020;1030;1040;1050;1060;1070;1080;1090;1120;1130;1140;1150;1160;1170;1180",
	"deliveryHours": {
	"monday":"15:00-20:00",
      "tuesday":"15:00-20:00",
      "wednesday":"15:00-20:00",
      "thursday":"15:00-20:00",
      "friday":"15:00-20:00",
      "saturday":"15:00-20:00",
      "sunday":"15:00-20:00"
 }
}
*/

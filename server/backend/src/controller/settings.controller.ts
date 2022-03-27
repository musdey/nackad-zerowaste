import DepositModel from '../models/Deposit'
import DepositItemModel from '../models/DepositItem'
import ShopSettings, { DeliveryHours, IShopSettings } from '../models/ShopSettings'

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
  extraSlots: number
) => {
  const settings = await ShopSettings.find({})
  console.log(settings)
  if (!settings || settings.length === 0) {
    return await new ShopSettings({ deliveryAreas: areas, deliveryHours: hours, slotsPerVehicle, vehicles }).save()
  }
  const oneSetting = settings[0]
  oneSetting.deliveryAreas = areas
  oneSetting.deliveryHours = hours as DeliveryHours
  oneSetting.slotsPerVehicle = slotsPerVehicle
  oneSetting.vehicles = vehicles
  oneSetting.extraSlots = extraSlots
  const updated = await oneSetting.save()
  return updated
}

type DepObject = {
  name: string
  amount: number
}

const getStatistics = async () => {
  // total deposit out
  // total deposit per unit
  const data = await DepositItemModel.find({})
  //const newArr: DepObject[] = []
  const aggregatedData = {
    totalDeposit: 0
  }
  data.forEach((item) => {
    if (item.amount != item.returned) {
      const amountOpen = item.amount - item.returned
      aggregatedData.totalDeposit += amountOpen * parseInt(item.pricePerItem)
    }
  })
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

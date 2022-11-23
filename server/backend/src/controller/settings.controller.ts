import DepositModel, { IDeposit } from '../models/Deposit'
import ShopSettings, { BigSlots, DeliveryHours } from '../models/ShopSettings'

const getSettings = async (shop: string) => {
  const settings = await ShopSettings.findOne({ shop }).select('-slotsPerVehicle -vehicles')
  return settings
}

const getSettingsAdmin = async (shop: string) => {
  const settings = await ShopSettings.findOne({ shop }).populate('shop')
  if (!settings) {
    return 'empty'
  }
  return settings
}

const updateSettings = async (
  useBigSlots: boolean,
  areas: string,
  hours: object,
  bigSlots: object,
  slotsPerVehicle: number,
  vehicles: number,
  extraSlots: number,
  showSlotDaysInAdvance: number,
  shop: string
) => {
  const setting = await ShopSettings.findOne({ shop })
  if (!setting) {
    return 'No Settings existent'
  }
  if (useBigSlots) {
    setting.bigSlots = bigSlots as BigSlots
  } else {
    setting.deliveryHours = hours as DeliveryHours
  }
  setting.useBigSlots = useBigSlots
  setting.deliveryAreas = areas
  setting.slotsPerVehicle = slotsPerVehicle
  setting.vehicles = vehicles
  setting.extraSlots = extraSlots
  setting.showSlotDaysInAdvance = showSlotDaysInAdvance
  const updated = await setting.save()
  return updated
}

const getStatistics = async (shop: any) => {
  const depositsAll = await DepositModel.find({
    status: { $ne: 'RETURNED' }
  }).populate('depositItems customer')
  const deposits = await depositsAll.map((deposit: IDeposit) => {
    console.log(deposit.customer.mainShop._id.toString())
    if (deposit.customer.mainShop._id.toString() === shop._id) {
      console.log(deposit)
      return deposit
    }
  })
  let totalDeposit = 0
  const result: any[] = []
  deposits.forEach((deposit) => {
    const returnedDep = parseInt(deposit!.returnedDeposit)
    const paidDep = parseInt(deposit!.paidDeposit)
    totalDeposit = totalDeposit + parseInt(deposit!.totalPrice) - (returnedDep || 0) - (paidDep || 0)
    deposit!.depositItems.forEach((item) => {
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

import DeliveryModel from '../models/Delivery'
import DepositModel from '../models/Deposit'
import DepositItemModel from '../models/DepositItem'
import User from '../models/User'
import { DepositStatus } from '../types'

const getDepositByUserId = async (userId: string) => {
  const customer = await User.findOne({ _id: userId })
  if (!customer) {
    throw new Error('User not found.')
  }
  const deposits = await DepositModel.find({ customer: customer }).populate('depositItems')
  return deposits
}

const getDepositByShopifyId = async (userId: string) => {
  const customer = await User.findOne({ shopifyUserId: userId })
  if (!customer) {
    throw new Error('User not found.')
  }
  const deposits = await DepositModel.find({ customer: customer }).populate('depositItems').select('-customer ')
  return deposits
}

const getDepositById = async (depositId: string) => {
  const deposits = await DepositModel.find({ _id: depositId })
  return deposits
}

const updateDeposit = async (
  depositId: string,
  deliveryId: string,
  returnedItems: [{ amount: number; id: string }]
) => {
  const delivery = await DeliveryModel.findById(deliveryId)
  let depositStatus: DepositStatus = DepositStatus.RETURNED
  let countReturnedDepositMoney = 0
  await Promise.all(
    returnedItems.map(async (depositItem) => {
      const item = await DepositItemModel.findById(depositItem.id)
      if (item) {
        item.returned = item.returned + depositItem.amount
        item.returnDates.push({ amount: depositItem.amount, date: new Date(), delivery: delivery })
        countReturnedDepositMoney = parseInt(item.pricePerItem) * depositItem.amount
        if (item.returned != item.amount) {
          depositStatus = DepositStatus.PARTIALLYRETURNED
        }
        await item.save()
      }
    })
  )
  const depositObj = await DepositModel.findById(depositId)
  if (depositObj) {
    depositObj.status = depositStatus
    depositObj.returnedDeposit = depositObj.returnedDeposit + countReturnedDepositMoney
    const result = await depositObj.save()
    return result
  }
  return 'ok'
}

const depositcontroller = { getDepositByUserId, getDepositById, getDepositByShopifyId, updateDeposit }
export default depositcontroller

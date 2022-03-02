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
  const deposits = await DepositModel.findOne({ _id: depositId }).populate('depositItems')
  return deposits
}

const updateDeposit = async (
  depositId: string,
  deliveryId: string,
  returnedItems: [{ amount: number; id: string }]
) => {
  const delivery = await DeliveryModel.findById(deliveryId)
  await Promise.all(
    returnedItems.map(async (depositItem) => {
      const item = await DepositItemModel.findById(depositItem.id)
      if (item && item.returned < item.amount && depositItem.amount <= item.amount - item.returned) {
        console.log(item)
        item.returned = item.returned + depositItem.amount
        item.returnDates.push({ amount: depositItem.amount, date: new Date(), delivery: delivery })
        await item.save()
      }
    })
  )
  const depositObj = await DepositModel.findById(depositId).populate('depositItems')
  if (depositObj) {
    let allReturned = true
    let contReturnedDepositMoney = 0
    depositObj.depositItems.forEach((item) => {
      contReturnedDepositMoney = contReturnedDepositMoney + parseInt(item.pricePerItem) * item.returned
      if (item.amount !== item.returned) {
        allReturned = false
      }
    })
    allReturned ? (depositObj.status = DepositStatus.RETURNED) : (depositObj.status = DepositStatus.PARTIALLYRETURNED)

    // wenn leerer string, dann setzte string
    if (depositObj.returnedDeposit.length === 0) {
      depositObj.returnedDeposit = contReturnedDepositMoney.toString()
    } else {
      depositObj.returnedDeposit = (parseFloat(depositObj.returnedDeposit) + contReturnedDepositMoney).toString()
    }
    const result = await depositObj.save()
    return result
  }
  return 'ok'
}

const depositcontroller = { getDepositByUserId, getDepositById, getDepositByShopifyId, updateDeposit }
export default depositcontroller

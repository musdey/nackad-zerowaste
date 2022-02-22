import DepositModel from '../models/Deposit'
import User from '../models/User'

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

const depositcontroller = { getDepositByUserId, getDepositById, getDepositByShopifyId }
export default depositcontroller

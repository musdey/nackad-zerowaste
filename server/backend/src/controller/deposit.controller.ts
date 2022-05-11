import DepositModel, { IDeposit } from '../models/Deposit'
import DepositItemModel, { IDepositItem } from '../models/DepositItem'
import DepositTypeModel from '../models/DepositType'

import User, { IUser } from '../models/User'
import { DepositStatus } from '../types'
import usercontroller from './user.controller'
import rechargeController from './recharge.controller'

const getDepositByUserId = async (userId: string) => {
  const customer = await User.findOne({ _id: userId })
  if (!customer) {
    throw new Error('User not found.')
  }
  const deposits = await DepositModel.find({ customer: customer, status: { $ne: 'RETURNED' } }).populate('depositItems')
  return deposits
}

const getDepositByRechargeUserId = async (rechargeUserId: number) => {
  const customer = await User.findOne({ rechargeCustomerId: rechargeUserId })
  if (!customer) {
    throw new Error('User not found.')
  }
  const deposits = await DepositModel.find({ customer: customer, status: { $ne: 'RETURNED' } }).populate('depositItems')
  return deposits
}

const getTotalOpenDepositByUserObj = async (user: IUser) => {
  const deposits = await DepositModel.find({ $and: [{ customer: user }, { status: { $ne: 'RETURNED' } }] })
  let total = 0
  deposits.forEach((deposit: IDeposit) => {
    total +=
      (parseInt(deposit.totalPrice) | 0) - (parseInt(deposit.returnedDeposit) | 0) + (parseInt(deposit.paidDeposit) | 0)
  })
  if (total > 0) {
    return total / 100
  } else {
    return 0
  }
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

const getDepositTypes = async () => {
  const depositTypes = await DepositTypeModel.find({})
  return depositTypes
}

const getAggregatedDepositByUserId = async (userId: string) => {
  const customer = await User.findOne({ _id: userId })
  if (!customer) {
    throw new Error('User not found.')
  }
  const deposits = await DepositModel.find({ customer: userId, status: { $ne: 'RETURNED' } }).populate('depositItems')

  const result: any[] = []

  deposits.forEach((deposit) => {
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

  // console.log(util.inspect(deposits, { showHidden: false, depth: null, colors: true }))

  const output = result.filter((depositItem) => depositItem.amount != depositItem.returned)
  return { output, deposits }
}

const addNewDeposit = async (
  userId: string,
  type: string,
  amount: string,
  depositTypeId?: string,
  depositId?: string
) => {
  if (depositId) {
    const deposit = await getDepositById(depositId)
    if (deposit) {
      const index = deposit.depositItems.findIndex((item) => {
        if (item.depositType) {
          if (item.depositType.valueOf() === depositTypeId) return true
        }
        if (item.type === type) return true
        return false
      })
      if (index >= 0) {
        deposit.depositItems[index].amount = deposit.depositItems[index].amount + parseInt(amount)
        const newTotalPrice =
          parseInt(deposit.totalPrice) + parseInt(amount) * parseInt(deposit.depositItems[index].pricePerItem)
        deposit.totalPrice = newTotalPrice.toString()
        await deposit.depositItems[index].save()
        await deposit.save()
      } else {
        const depositType = await DepositTypeModel.findOne({ $or: [{ _id: depositTypeId }, { name: type }] })
        const newDepositItem = await new DepositItemModel({
          amount,
          type,
          pricePerItem: depositType?.price,
          depositType
        }).save()
        const newTotalPrice = parseInt(deposit.totalPrice) + parseInt(amount) * parseInt(depositType!.price)
        deposit.totalPrice = newTotalPrice.toString()
        deposit.depositItems.push(newDepositItem)
        await deposit.save()
      }
      return deposit
    }
  }
  if (userId) {
    const user = await usercontroller.getOne(userId)
    if (user) {
      const depositType = await DepositTypeModel.findOne({ $or: [{ _id: depositTypeId }, { name: type }] })
      const totalPrice: number | undefined = parseInt(depositType!.price) * parseInt(amount!)
      const newDepositItem = await new DepositItemModel({
        amount,
        type,
        pricePerItem: depositType?.price,
        depositType
      }).save()
      const today = new Date()
      const anotherDate = new Date()
      const newDeposit = await new DepositModel({
        customer: user._id,
        depositItems: [newDepositItem],
        totalPrice: totalPrice.toString(),
        orderDate: today,
        dueDate: new Date(today.setDate(anotherDate.getDate() + 21)),
        lastDueDate: new Date(today.setDate(anotherDate.getDate() + 90))
      }).save()
      return newDeposit
    }
  }
  return { result: 'not updated' }
}

const returnDeposit = async (
  userId: string,
  deliveryId: string,
  returnedItems: [{ amount: number; id: string; depositTypeId: string; type: string }]
) => {
  // Get all open deposits by user
  const deposits = await getDepositByUserId(userId)
  // sort by oldest
  const sorted = deposits.sort((a: IDeposit, b: IDeposit) => {
    if (new Date(a.orderDate) < new Date(b.orderDate)) {
      return -1
    } else {
      return 1
    }
  })

  sorted.forEach(async (deposit) => {
    let allReturned = true
    let countReturnedDepositMoney = 0
    const depositItems = deposit.depositItems
    // Iterate through all depositItems

    depositItems.forEach(async (depositItem: IDepositItem) => {
      // Iterate through all returned items
      returnedItems.forEach(async (returnedItem) => {
        // Iterate through all existing open deposit objects
        let amountToBeReturned = returnedItem.amount
        if (amountToBeReturned > 0) {
          let matching = false
          if (depositItem.depositType) {
            if (depositItem.depositType.valueOf() === returnedItem?.depositTypeId) {
              matching = true
            }
          } else {
            if (depositItem.type === returnedItem.type) {
              matching = true
            }
          }
          if (matching) {
            const totalThatCanBeReturned = depositItem.amount - depositItem.returned
            let returning
            if (amountToBeReturned > totalThatCanBeReturned) {
              returning = depositItem.amount - depositItem.returned
              depositItem.returned = depositItem.amount
              amountToBeReturned = amountToBeReturned - returning
            } else {
              returning = returnedItem.amount
              depositItem.returned = depositItem.returned + returnedItem.amount
              amountToBeReturned = 0
            }
            returnedItem.amount = returnedItem.amount = returnedItem.amount - returning
            depositItem.returnDates.push({ amount: returning, date: new Date() })
            countReturnedDepositMoney = countReturnedDepositMoney + parseInt(depositItem.pricePerItem) * returning
          }
        }
      })
      if (depositItem.amount !== depositItem.returned) {
        allReturned = false
      }
      await depositItem.save()
    })

    if (countReturnedDepositMoney > 0) {
      const today = new Date()
      deposit.dueDate = new Date(today.setDate(today.getDate() + 21)).toString()
    }

    // If string empty, set it
    if (deposit.returnedDeposit.length === 0) {
      deposit.returnedDeposit = countReturnedDepositMoney.toString()
    } else {
      deposit.returnedDeposit = (parseFloat(deposit.returnedDeposit) + countReturnedDepositMoney).toString()
    }
    if (allReturned) {
      deposit.status = DepositStatus.RETURNED
    } else {
      deposit.returnedDeposit === '0'
        ? (deposit.status = DepositStatus.OPEN)
        : (deposit.status = DepositStatus.PARTIALLYRETURNED)
    }
    await deposit.save()
  })

  await rechargeController.updateDepositPrice(userId)

  return { result: 'ok' }
}

const depositcontroller = {
  getAggregatedDepositByUserId,
  getDepositByUserId,
  getDepositById,
  getDepositByShopifyId,
  returnDeposit,
  addNewDeposit,
  getDepositTypes,
  getTotalOpenDepositByUserObj,
  getDepositByRechargeUserId
}
export default depositcontroller

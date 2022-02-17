import { Document, Schema, Model, model } from 'mongoose'
import { DepositStatus } from '../types'
import Order from '../types/order'
import { IDepositItem } from './DepositItem'
import { IUser } from './User'

export interface IDeposit extends Document {
  // _id let it autogenerate by mongodb
  customer: IUser
  order: Order
  status: DepositStatus
  depositItems: [IDepositItem]
  totalPrice: string
  paidDeposit: string
}

const DepositSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    totalPrice: {
      type: String
    },
    paidDeposit: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['OPEN', 'PARTIALLYRETURNED', 'RETURNED'],
      default: 'OPEN'
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    depositItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DepositItem'
      }
    ]
  },
  { strict: false, versionKey: false }
)

const DepositModel: Model<IDeposit> = model('Deposit', DepositSchema)
export default DepositModel
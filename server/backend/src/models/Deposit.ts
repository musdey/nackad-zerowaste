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
  returnedDeposit: string
  orderDate: string
  dueDate: string
  lastDueDate: string
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
    returnedDeposit: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['OPEN', 'PARTIALLYRETURNED', 'RETURNED', 'PAID', 'PARTIALLYPAID'],
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
    ],
    orderDate: {
      type: String
    },
    dueDate: {
      type: String
    },
    lastDueDate: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const DepositModel: Model<IDeposit> = model<IDeposit>('Deposit', DepositSchema)
export default DepositModel

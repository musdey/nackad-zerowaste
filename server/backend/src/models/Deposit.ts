import { Document, Schema, Model, model } from 'mongoose'
import { DepositStatus } from '../types'
import Order from '../types/order'
import { IDepositItem } from './DepositItem'

export interface IDeposit extends Document {
  // _id let it autogenerate by mongodb
  order: Order
  status: DepositStatus
  depositItems: [IDepositItem]
  totalPrice: string
}

const DepositSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    id: {
      type: String
    },
    status: {
      type: String,
      enum: ['OPEN', 'PARTIALLYRETURNED', 'RETURNED'],
      default: 'OPEN'
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: undefined
    },
    depositItems: {
      type: [Schema.Types.ObjectId],
      ref: 'Deposit',
      default: undefined
    }
  },
  { strict: false, versionKey: false }
)

const DepositModel: Model<IDeposit> = model('Deposit', DepositSchema)
export default DepositModel

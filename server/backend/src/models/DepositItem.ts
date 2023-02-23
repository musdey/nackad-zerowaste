import { Document, Schema, Model, model } from 'mongoose'
import { IDelivery } from './Delivery'
import { IDepositType } from './DepositType'

export interface IDepositItem extends Document {
  // _id let it autogenerate by mongodb
  type: string // Glas/Kiste etc..
  depositType: IDepositType
  productName: string
  amount: number
  returned: number
  returnDates: [
    {
      amount: number
      date: Date
      delivery?: IDelivery | null
    }
  ]
  pricePerItem: string
}

const DepositItemSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    deposit: {
      type: Schema.Types.ObjectId,
      ref: 'Deposit'
    },
    depositType: {
      type: Schema.Types.ObjectId,
      ref: 'DepositType'
    },
    type: {
      type: String
    },
    productName: {
      type: String
    },
    amount: {
      type: Number
    },
    returned: {
      type: Number,
      default: 0
    },
    returnDates: [
      {
        amount: Number,
        date: Date,
        delivery: {
          type: Schema.Types.ObjectId,
          ref: 'Delivery'
        }
      }
    ],
    pricePerItem: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const DepositItemModel: Model<IDepositItem> = model<IDepositItem>('DepositItem', DepositItemSchema)
export default DepositItemModel

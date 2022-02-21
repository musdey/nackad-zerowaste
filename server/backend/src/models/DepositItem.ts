import { Document, Schema, Model, model } from 'mongoose'
import { IDelivery } from './Delivery'

export interface IDepositItem extends Document {
  // _id let it autogenerate by mongodb
  type: string // Glas/Kiste etc..
  productName: string
  amount: number
  returned: number
  returnDates: [
    {
      amount: number
      date: Date
      delivery: IDelivery
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

const DepositItemModel: Model<IDepositItem> = model('DepositItem', DepositItemSchema)
export default DepositItemModel

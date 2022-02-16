import { Document, Schema, Model, model } from 'mongoose'

export interface IDepositItem extends Document {
  // _id let it autogenerate by mongodb
  type: string
  productName: string
  amount: number
  returned: number
  returnDates: [
    {
      amount: number
      date: string
    }
  ]
  pricePerItem: string
}

const DepositItemSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
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
    returnDates: {
      type: [Object],
      default: undefined
    },
    pricePerItem: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const DepositItemModel: Model<IDepositItem> = model('DepositItem', DepositItemSchema)
export default DepositItemModel

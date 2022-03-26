import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './User'

export interface IOrder extends Document {
  // _id let it autogenerate by mongodb
  user: IUser
  shopifyOrderId?: string
  deliveryDay: Date
  timeslot: string
  created_at: Date
  note_attributes: [
    {
      name: string
      value: string
    }
  ]
}

const OrderSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    shopifyOrderId: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    created_at: {
      type: Date
    }
  },
  { strict: false, versionKey: false }
)

const OrderModel: Model<IOrder> = model('Order', OrderSchema)
export default OrderModel

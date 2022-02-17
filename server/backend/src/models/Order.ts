import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './User'

export interface IOrder extends Document {
  // _id let it autogenerate by mongodb
  user: IUser
  deliveryDay: string
  timeslot: string
}

const OrderSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { strict: false, versionKey: false }
)

const OrderModel: Model<IOrder> = model('Order', OrderSchema)
export default OrderModel

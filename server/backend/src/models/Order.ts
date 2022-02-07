import { Document, Schema, Model, model } from 'mongoose'

export interface IOrder extends Document {
  // _id let it autogenerate by mongodb
  id: string
}

const OrderSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    id: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const OrderModel: Model<IOrder> = model('Order', OrderSchema)
export default OrderModel

import { Document, Schema, Model, model } from 'mongoose'
import Address from '../types/address'
import Order from '../types/order'

export interface IDelivery extends Document {
  // _id let it autogenerate by mongodb
  shopifyOrder: Order
  shopifyOrderId: string
  status: string
  updates: [object]
  address: Address
}

const DeliverySchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    shopifyOrderId: {
      type: String
    },
    shopifyOrder: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    address: {
      type: Object
    },
    updates: {
      type: [Object]
    },
    status: {
      type: String,
      enum: ['OPEN', 'INDELIVERY', 'DELIVERED', 'CANCELLED'],
      default: 'OPEN'
    }
  },
  { strict: false, versionKey: false }
)

const DeliveryModel: Model<IDelivery> = model('Delivery', DeliverySchema)
export default DeliveryModel

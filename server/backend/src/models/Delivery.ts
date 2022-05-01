import { Document, Schema, Model, model } from 'mongoose'
import Address from '../types/address'
import Order from '../types/order'
import { IDeliverySlot } from './DeliverySlots'
import { IUser } from './User'

export interface IDelivery extends Document {
  // _id let it autogenerate by mongodb
  shopifyOrder: Order
  shopifyOrderId: string
  status: string
  updates: [object]
  address: Address
  deliverySlot: IDeliverySlot
  user: IUser
  slotHours: string
  deliveryDay: Date
  type: 'PICKUP' | 'DELIVERY'
}

const DeliverySchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    shopifyOrder: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    type: {
      type: String,
      default: 'DELIVERY'
    },
    shopifyOrderId: {
      type: String
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
    },
    deliverySlot: {
      type: Schema.Types.ObjectId,
      ref: 'Deliveryslot'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    deliveryDay: {
      type: Date
    },
    slotHours: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const DeliveryModel: Model<IDelivery> = model('Delivery', DeliverySchema)
export default DeliveryModel

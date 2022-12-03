import { Document, Schema, Model, model } from 'mongoose'
import Address from '../types/address'
import Order from '../types/order'
import { IDeliverySlot } from './DeliverySlots'
import { IShop } from './Shop'
import { IUser } from './User'

export interface IDelivery extends Document {
  // _id let it autogenerate by mongodb
  shop: IShop
  webShopOrder: Order
  webShopOrderId: string
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
    webShopOrder: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    type: {
      type: String,
      default: 'DELIVERY'
    },
    webShopOrderId: {
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

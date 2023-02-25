import { Document, Schema, Model, model } from 'mongoose'
import { IDelivery } from './Delivery'
import { IShop } from './Shop'
import { IUser } from './User'
export interface IDeliverySlot extends Document {
  // _id let it autogenerate by mongodb
  shop: IShop
  deliveryDay: Date
  slotHours: string
  deliveries?: IDelivery[]
  maxSlotSize: number
  deliveryAreas: string
  available: number
  lastUpdatedFrom: [{ date: Date; user: IUser }]
  vehicleId: string
}

const DeliverySlotSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    vehicleId: {
      type: String
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    deliveryDay: {
      type: Date
    },
    slotHours: {
      type: String
    },
    deliveryAreas: {
      type: String
    },
    deliveries: {
      type: [Schema.Types.ObjectId],
      ref: 'Delivery'
    },
    maxSlotSize: {
      type: Number
    },
    available: {
      type: Number
    },
    lastUpdatedFrom: {
      type: [
        {
          date: {
            type: Date
          },
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        }
      ]
    }
  },
  { strict: false, versionKey: false }
)

const DeliverySlotModel: Model<IDeliverySlot> = model<IDeliverySlot>('Deliveryslot', DeliverySlotSchema)
export default DeliverySlotModel

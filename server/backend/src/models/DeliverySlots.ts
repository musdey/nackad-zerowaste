import { Document, Schema, Model, model } from 'mongoose'
import Config from '../Config'
import { IDelivery } from './Delivery'
import { IUser } from './User'
export interface IDeliverySlot extends Document {
  // _id let it autogenerate by mongodb
  deliveryDay: Date
  slotHours: string
  deliveries?: [IDelivery]
  maxSlotSize: number
  available: number
  lastUpdatedFrom: [{ date: Date; user: IUser }]
}

const DeliverySlotSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    deliveryDay: {
      type: Date
    },
    slotHours: {
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

const DeliverySlotModel: Model<IDeliverySlot> = model('Deliveryslot', DeliverySlotSchema)
export default DeliverySlotModel

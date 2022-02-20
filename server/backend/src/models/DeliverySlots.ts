import { Document, Schema, Model, model } from 'mongoose'
import { IDelivery } from './Delivery'
import { IUser } from './User'
export interface IDeliverySlot extends Document {
  // _id let it autogenerate by mongodb
  deliveryDay: string
  slotHours: string
  delivery: [IDelivery]
  available: number
  lastUpdatedFrom: [{ date: string; user: IUser }]
}

const DeliverySlotSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    deliveryDay: {
      type: String
    },
    slotHours: {
      type: String
    },
    delivery: {
      type: [Schema.Types.ObjectId],
      ref: 'Delivery'
    },
    available: {
      type: Number,
      default: 2
    },
    lastUpdatedFrom: {
      type: [
        {
          date: {
            type: String
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

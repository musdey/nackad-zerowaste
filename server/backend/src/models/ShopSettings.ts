import { Document, Schema, Model, model } from 'mongoose'
import { DeliverySlots } from '../types/shopconfig'
import { IShop } from './Shop'
export interface IShopSettings extends Document {
  shop: IShop
  deliverySlots: DeliverySlots
  showSlotDaysInAdvance: number
  useHourlySlots: boolean
  smsText: string
}

const SingleSlotSchema = new Schema({
  hours: String,
  deliveryAreas: String,
  maxDeliveries: Number
})

const VehicleSlot = new Schema({
  vehicle: String,
  slots: [SingleSlotSchema]
})

const ShopSettingsSchema = new Schema(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    deliverySlots: {
      monday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ],
      tuesday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ],
      wednesday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ],
      thursday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ],
      friday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ],
      saturday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ],
      sunday: [
        {
          type: Object,
          of: [VehicleSlot]
        }
      ]
    },
    showSlotDaysInAdvance: {
      type: Number,
      default: 5
    },
    useHourlySlots: {
      type: Boolean,
      default: false
    },
    smsText: {
      type: String,
    }
  },
  { strict: false, versionKey: false }
)

const ShopSettings: Model<IShopSettings> = model<IShopSettings>('ShopSettings', ShopSettingsSchema)
export default ShopSettings

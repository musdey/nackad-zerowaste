import { Document, Schema, Model, model } from 'mongoose'
import { DeliverySlots } from '../types/shopconfig'
import { IShop } from './Shop'
export interface IShopSettings extends Document {
  shop: IShop
  deliverySlots: DeliverySlots
  showSlotDaysInAdvance: number
  useHourlySlots: boolean
}

const SingleSlotSchema = new Schema({
  hours: String,
  deliveryAreas: String,
  maxDeliveries: Number
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
          of: [SingleSlotSchema]
        }
      ],
      tuesday: [
        {
          type: Object,
          of: [SingleSlotSchema]
        }
      ],
      wednesday: [
        {
          type: Object,
          of: [SingleSlotSchema]
        }
      ],
      thursday: [
        {
          type: Object,
          of: [SingleSlotSchema]
        }
      ],
      friday: [
        {
          type: Object,
          of: [SingleSlotSchema]
        }
      ],
      saturday: [
        {
          type: Object,
          of: [SingleSlotSchema]
        }
      ],
      sunday: [
        {
          type: Object,
          of: [SingleSlotSchema]
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
    }
  },
  { strict: false, versionKey: false }
)

const ShopSettings: Model<IShopSettings> = model('ShopSettings', ShopSettingsSchema)
export default ShopSettings

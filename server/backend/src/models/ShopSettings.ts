import { Document, Schema, Model, model } from 'mongoose'

export type DeliveryHours = {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export interface IShopSettings extends Document {
  // _id let it autogenerate by mongodb
  deliveryHours: DeliveryHours
  deliveryAreas: string
}

const ShopSettingsSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    deliveryHours: {
      monday: { type: String },
      tuesday: { type: String },
      wednesday: { type: String },
      thursday: { type: String },
      friday: { type: String },
      saturday: { type: String },
      sunday: { type: String }
    },
    deliveryAreas: {
      type: [String]
    }
  },
  { strict: false, versionKey: false }
)

const ShopSettings: Model<IShopSettings> = model('ShopSettings', ShopSettingsSchema)
export default ShopSettings

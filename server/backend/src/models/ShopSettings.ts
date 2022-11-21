import { Document, Schema, Model, model } from 'mongoose'
import { IShop } from './Shop'

export type DeliveryHours = {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export type SingleSlot = {
  hours: string
  excludedDeliveryAreas?: string
}

type BigSlots = {
  monday: SingleSlot[]
  tuesday: SingleSlot[]
  wednesday: SingleSlot[]
  thursday: SingleSlot[]
  friday: SingleSlot[]
  saturday: SingleSlot[]
  sunday: SingleSlot[]
}
export interface IShopSettings extends Document {
  shop: IShop
  deliveryHours: DeliveryHours
  bigSlots: BigSlots
  exludedDeliveryAreas?: [string]
  deliveryAreas: string
  slotsPerVehicle: number
  extraSlots: number
  vehicles: number
  showSlotDaysInAdvance: number
  useBigSlots: boolean
}

const SingleSlotSchema = new Schema({
  hours: String,
  excludedDeliveryAreas: String
})

const ShopSettingsSchema = new Schema(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    deliveryHours: {
      monday: { type: String },
      tuesday: { type: String },
      wednesday: { type: String },
      thursday: { type: String },
      friday: { type: String },
      saturday: { type: String },
      sunday: { type: String }
    },
    bigSlots: {
      monday: { type: [SingleSlotSchema] },
      tuesday: { type: [SingleSlotSchema] },
      wednesday: { type: [SingleSlotSchema] },
      thursday: { type: [SingleSlotSchema] },
      friday: { type: [SingleSlotSchema] },
      saturday: { type: [SingleSlotSchema] },
      sunday: { type: [SingleSlotSchema] }
    },
    deliveryAreas: {
      type: [String]
    },
    slotsPerVehicle: {
      type: Number,
      default: 2
    },
    extraSlots: {
      type: Number,
      default: 1
    },
    vehicles: {
      type: Number,
      default: 2
    },
    showSlotDaysInAdvance: {
      type: Number,
      default: 5
    },
    useBigSlots: {
      type: Boolean,
      default: false
    }
  },
  { strict: false, versionKey: false }
)

const ShopSettings: Model<IShopSettings> = model('ShopSettings', ShopSettingsSchema)
export default ShopSettings

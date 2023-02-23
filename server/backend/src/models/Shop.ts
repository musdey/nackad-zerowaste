import { Document, Schema, Model, model } from 'mongoose'
import { IShopSettings } from './ShopSettings'

export interface IShop extends Document {
  // _id let it autogenerate by mongodb
  _id: string
  name: string
  url: string
  orderWebhook: string
  deliveryWebhook: string
  settings: IShopSettings
}

const ShopSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    name: {
      type: String,
      enum: ['NACKAD', 'REXEAT']
    },
    url: {
      type: String
    },
    orderWebhook: {
      type: String
    },
    deliveryWebhook: {
      type: String
    },
    settings: {
      type: Schema.Types.ObjectId,
      ref: 'ShopSettings'
    }
  },
  { strict: false, versionKey: false }
)

const Shop: Model<IShop> = model<IShop>('Shop', ShopSchema)
export default Shop

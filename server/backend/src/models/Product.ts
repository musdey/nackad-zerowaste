import { Document, Schema, Model, model } from 'mongoose'
import { IShop } from './Shop'

export interface IProduct extends Document {
  // _id let it autogenerate by mongodb
  webShopId: string
  webShop: IShop
  title: string
  packaging?: string
  deposit?: string
  price: string
  imgUrl?: string
}

const ProductSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    webShopId: {
      type: String
    },
    webShop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    title: {
      type: String
    },
    packaging: {
      type: String
    },
    deposit: {
      type: String
    },
    price: {
      type: String
    },
    imgUrl: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const Product: Model<IProduct> = model('Product', ProductSchema)
export default Product

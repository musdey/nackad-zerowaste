import { Document, Schema, Model, model } from 'mongoose'

export interface IProduct extends Document {
  // _id let it autogenerate by mongodb
  shopifyId: string
  title: string
  packaging?: string
  deposit?: string
  price: string
}

const ProductSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    shopifyId: {
      type: String
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
    }
  },
  { strict: false, versionKey: false }
)

const Product: Model<IProduct> = model('Product', ProductSchema)
export default Product

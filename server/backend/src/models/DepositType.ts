import { Document, Schema, Model, model } from 'mongoose'

export interface IDepositType extends Document {
  // _id let it autogenerate by mongodb
  name: string
  price: string
  shape: string
  material?: string
  weight?: string
  height?: string
  width?: string
  depth?: string
}

const DepositTypeScheme = new Schema(
  {
    // _id let it autogenerate by mongodb
    name: {
      type: String
    },
    shape: {
      type: String
    },
    price: {
      type: String
    },
    material: {
      type: String
    },
    weight: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    depth: {
      type: String
    }
  },
  { strict: false, versionKey: false }
)

const DepositTypeModel: Model<IDepositType> = model('DepositType', DepositTypeScheme)
export default DepositTypeModel

import { Document, Schema, Model, model } from 'mongoose'

export interface IRole extends Document {
  // _id let it autogenerate by mongodb
  name: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
}

const RoleSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    name: {
      type: String,
      enum: ['CUSTOMER', 'EMPLOYEE', 'ADMIN'],
      default: 'CUSTOMER'
    }
  },
  { strict: false, versionKey: false }
)

const Role: Model<IRole> = model('Role', RoleSchema)
export default Role

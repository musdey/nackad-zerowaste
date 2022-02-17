import { Document, Schema, Model, model } from 'mongoose'
import Address from '../types/address'
import Role from './Role'

export interface IUser extends Document {
  // _id let it autogenerate by mongodb
  shopifyUserId?: string
  username?: string
  role: {
    name: string
    _id: string
  }
  address: Address
  password?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  emailIsVerified?: boolean
  otpActivated?: boolean
}

const UserSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    shopifyUserId: {
      type: String
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    username: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      zip: { type: String },
      province: { type: String },
      country: { type: String },
      country_code: { type: String },
      province_code: { type: String }
    },
    emailIsVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    otpActivated: {
      type: Boolean,
      default: false
    }
  },
  { strict: false, versionKey: false }
)

UserSchema.pre('save', async function (next) {
  const role = await Role.findOne({ name: 'CUSTOMER' }).exec()
  if (this.role == null) this.role = role?._id || undefined
  next()
})

const User: Model<IUser> = model('User', UserSchema)
export default User

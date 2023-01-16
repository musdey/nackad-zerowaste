import { Document, Schema, Model, model } from 'mongoose'
import Address from '../types/address'
import Role, { IRole } from './Role'
import { IShop } from './Shop'

export type access = {
  role: IRole
  shop: IShop
}

export interface IUser extends Document {
  // _id let it autogenerate by mongodb
  webShopUserId?: string
  webShopCustomerNumber?: string
  username?: string
  mainShop: IShop
  role: IRole
  extraAccess: [access]
  address: Address
  password?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  emailIsVerified?: boolean
  otpActivated?: boolean
  rechargeSubscriptionId?: number
  rechargeCustomerId?: number
}

const UserSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    extraAccess: [
      {
        role: {
          type: Schema.Types.ObjectId,
          ref: 'Role'
        },
        shop: {
          type: Schema.Types.ObjectId,
          ref: 'Shop'
        }
      }
    ],
    mainShop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    webShopCustomerNumber: {
      type: String
    },
    customerNumber: {
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
      required: true
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
    },
    rechargeSubscriptionId: {
      type: Number
    },
    rechargeCustomerId: {
      type: Number
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

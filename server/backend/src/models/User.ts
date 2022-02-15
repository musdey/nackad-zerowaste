import { Document, Schema, Model, model } from 'mongoose'

export interface IUser extends Document {
  // _id let it autogenerate by mongodb
  username?: string
  role: {
    name: string
    _id: string
  }
  password: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  emailIsVerified: boolean
  otpActivated: boolean
}

const UserSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
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
    emailIsVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
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

const User: Model<IUser> = model('User', UserSchema)
export default User

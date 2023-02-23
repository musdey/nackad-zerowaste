import { Document, Schema, Model, model } from 'mongoose'
import { IShop } from './Shop'
import { IUser } from './User'

interface ISignupOTP extends Document {
  // _id let it autogenerate by mongodb
  createdBy: IUser
  shop: IShop
  pin: string
  timestamp: Date
  otpExpires: Date
}

const SingupOTPSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    pin: {
      type: String,
      required: true
      // TODO: auto remove token within 24 hours
    },
    timestamp: {
      type: Date,
      required: true
    },
    otpExpires: {
      type: Date,
      required: true
    }
  },
  { strict: false, versionKey: false }
)

const SignupOTP: Model<ISignupOTP> = model<ISignupOTP>('SignupOTP', SingupOTPSchema)
export default SignupOTP

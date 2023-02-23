import { Document, Schema, Model, model } from 'mongoose'

interface IUserLoginOTP extends Document {
  // _id let it autogenerate by mongodb
  email: string
  otp: string
  timestamp: Date
  otpExpires: Date
}

const UserLoginOTPSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    email: {
      type: String,
      required: true
    },
    otp: {
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

const UserLoginOTP: Model<IUserLoginOTP> = model<IUserLoginOTP>('UserLoginOTP', UserLoginOTPSchema)
export default UserLoginOTP

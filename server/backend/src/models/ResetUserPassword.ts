import { Schema, Model, Document, model } from 'mongoose'

interface IResetUserPassword extends Document {
  email: string
  timestamp: Date
  resetPasswordExpires: Date
  resetPasswordToken: string
  updated: boolean
}

const ResetUserPasswordSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    email: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: new Date()
    },
    resetPasswordExpires: {
      type: Date,
      required: true
    },
    resetPasswordToken: {
      type: String,
      required: true
    },
    updated: {
      type: Boolean
    }
  },
  { strict: false, versionKey: false }
)

const ResetUserPassword: Model<IResetUserPassword> = model('ResetUserPassword', ResetUserPasswordSchema)

export default ResetUserPassword

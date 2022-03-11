import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import Role from '../models/Role'
import UserLoginOTP from '../models/UserLoginOTP'
import sendSMS from '../lib/smsService'

const secret = process.env.JWT_SECRET || 'someRandomTestString'
const EXPIRYTIME = 10 * 60 * 1000 // 10 minutes

const signup = async (email: string, password: string, firstName: string, lastName: string) => {
  const createdUser = await new User({
    email: email,
    password: bcrypt.hashSync(password!, 8),
    firstName: firstName,
    lastName: lastName
  }).save()

  const userRole = await Role.findOne({ name: 'CUSTOMER' })
  createdUser.role = userRole?._id
  await createdUser.save()
}

const signin = async (email: string, password: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User Not found.')
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password!)

  if (!passwordIsValid) {
    throw new Error('Invalid password.')
  }

  // if (user.otpActivated) {
  //   await createAndDeliverOTP(user)
  //   return ''
  // }
  const token = jwt.sign({ id: user._id }, secret, {
    expiresIn: 2592000 // 60 * 60 * 24 * 30 // 1 month
  })
  // res.cookie('Token ', token, { httpOnly: true });
  const role = await Role.findById(user.role).select('-_id')

  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    accessToken: token,
    role: role
  }
}

const requestOTP = async (email: string, password: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User Not found.')
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password!)

  if (!passwordIsValid) {
    throw new Error('Invalid Password!')
  }

  await createAndDeliverOTP(email, password)
}

const createAndDeliverOTP = async (email: string, password: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User Not found.')
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password!)

  if (!passwordIsValid) {
    throw new Error('Invalid Password!')
  }

  const oneTimePwPin = Math.floor(100000 + Math.random() * 900000).toString()
  const userOTPObj = new UserLoginOTP({
    email: user.email,
    otp: oneTimePwPin,
    timestamp: Date.now(),
    otpExpires: Date.now() + EXPIRYTIME
  })
  const result = await userOTPObj.save()
  console.log(result)
  await sendSMS(user.email, user.phoneNumber!, oneTimePwPin)
}

const signinWithOTP = async (email: string, password: string, otp: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User Not found.')
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password!)

  if (!passwordIsValid) {
    throw new Error('Invalid password!')
  }
  const otpData = await UserLoginOTP.findOne({ email, otpExpires: { $gt: new Date() } })
  if (!otpData || otpData.otp !== otp) {
    //return res.status(401).send({ message: 'OTP not found or incorrect' })
    throw Error('No, OTP provided. Please add otp or request one.')
  }

  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 86400 // 24 hours
  })

  otpData.otpExpires = new Date()
  await otpData.save()
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    accessToken: token
  }
}

const authController = { signin, signup, signinWithOTP, requestOTP, createAndDeliverOTP }
export default authController

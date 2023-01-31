import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/User'
import Role, { IRole } from '../models/Role'
import UserLoginOTP from '../models/UserLoginOTP'
import sendSMS from '../lib/smsService'
import Shop, { IShop } from '../models/Shop'
import SignupOTP from '../models/SingupOTP'
import settingsController from './settings.controller'

const secret = process.env.JWT_SECRET || 'someRandomTestString'
const EXPIRYTIME = 10 * 60 * 1000 // 10 minutes

const signup = async (email: string, password: string, firstName: string, lastName: string, shop: IShop) => {
  // Create user object
  const createdUser = await new User({
    email: email,
    password: bcrypt.hashSync(password!, 8),
    firstName: firstName,
    lastName: lastName,
    mainShop: shop
  }).save()

  // Set customer role
  const role = (await Role.findOne({ name: 'CUSTOMER' })) as IRole
  createdUser.role = role
  await createdUser.save()
}

const signin = async (email: string, password: string) => {
  const user = await User.findOne({ email }).populate('mainShop role')
  if (!user) {
    throw new Error('User Not found.')
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password!)

  if (!passwordIsValid) {
    throw new Error('Invalid password.')
  }

  // Here would be a good spot to send out OTP

  // Sign JWT Token
  const role = await Role.findById(user.role).select('-_id')

  const token = jwt.sign(
    { userId: user._id, mainShop: user.mainShop, role: role, extraAccess: user.extraAccess },
    secret,
    {
      expiresIn: 2592000 // 60 * 60 * 24 * 30 // 1 month
    }
  )

  const returnedUser: any = user.toObject()
  returnedUser.accessToken = token
  returnedUser.password = ''
  const shop = await Shop.findOne({ name: user.mainShop.name })
  const smsText = await settingsController.getSMSSettings(shop)
  if (smsText) {
    returnedUser.smsText = smsText.smsText
  }
  return returnedUser
}

const createSignupOTP = async (user: IUser, shop: IShop) => {
  // Invalidate previous token
  const previousOtp = await SignupOTP.findOne({ createdBy: user, otpExpires: { $gte: new Date() } })
  if (previousOtp) {
    previousOtp.otpExpires = new Date()
    await previousOtp.save()
  }

  const pin = Math.floor(10000000 + Math.random() * 90000000).toString()
  //const pin = otpGenerator.generate(8, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
  const createdOTP = await new SignupOTP({
    createdBy: user,
    shop,
    pin,
    timestamp: new Date(),
    otpExpires: new Date().setHours(new Date().getHours() + 2)
  }).save()
  return pin
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

const authController = { signin, signup, createSignupOTP, signinWithOTP, requestOTP, createAndDeliverOTP }
export default authController

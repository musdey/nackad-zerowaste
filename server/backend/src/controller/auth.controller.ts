import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Handler, NextFunction, Request, Response } from 'express'
import User from '../models/User'
import Role from '../models/Role'
import { UserValidator, getValidationErrorData } from '../lib/validator'
import UserLoginOTP from '../models/UserLoginOTP'
import sendSMS from '../lib/smsService'

const secret = process.env.JWT_SECRET || 'test'
const EXPIRYTIME = 10 * 60 * 1000 // 10 minutes

const signup: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = await UserValidator.validate(req.body)
    if (validationResult.length !== 0) {
      return res.status(400).send(getValidationErrorData(validationResult))
    }

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })

    const createdUser = await user.save()
    const userRole = await Role.findOne({ name: 'CUSTOMER' })
    createdUser.role = userRole?._id
    await createdUser.save()
    return res.status(200).send({ message: 'User was registered successfully!' })
  } catch (err) {
    return next(err)
  }
}

const signin: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password!)

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }

    if (user.otpActivated) {
      await createAndDeliverOTP(user)
      return res.status(201).send({ message: 'OTP successfully created.' })
    }
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 2592000 // 60 * 60 * 24 * 30 // 1 month
    })
    // res.cookie('Token ', token, { httpOnly: true });
    const role = await Role.findById(user.role)
    return res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      role: role?.name
    })
  } catch (err) {
    return next(err)
  }
}

const requestOTP: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password!)

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }

    await createAndDeliverOTP(user)

    return res.status(201).send({ message: 'OTP successfully created.' })
  } catch (err) {
    return next(err)
  }
}

const createAndDeliverOTP = async (user: any) => {
  const oneTimePwPin = Math.floor(100000 + Math.random() * 900000).toString()
  const userOTPObj = new UserLoginOTP({
    email: user.email,
    otp: oneTimePwPin,
    timestamp: Date.now(),
    otpExpires: Date.now() + EXPIRYTIME
  })
  const result = await userOTPObj.save()
  console.log(result)
  await sendSMS(user.email, user.phoneNumber, oneTimePwPin)
}

const signinWithOTP: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password!)

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }
    const otp = await UserLoginOTP.findOne({ email: req.body.email, otpExpires: { $gt: new Date() } })
    if (!otp || otp.otp !== req.body.otp) {
      //return res.status(401).send({ message: 'OTP not found or incorrect' })
      return next(new Error('No, OTP provided. Please add otp or request one.'))
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    })

    otp.otpExpires = new Date()
    await otp.save()
    return res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token
    })
  } catch (err) {
    return next(err)
  }
}

export { signin, signup, signinWithOTP, requestOTP }

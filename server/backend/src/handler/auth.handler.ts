import { Handler, NextFunction, Request, Response } from 'express'
import { UserValidator, getValidationErrorData } from '../lib/validator'
import authController from '../controller/auth.controller'
import Shop from '../models/Shop'
import SignupOTP from '../models/SingupOTP'
import User from '../models/User'

const signup: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = await UserValidator.validate(req.body)
    if (validationResult.length !== 0) {
      return res.status(400).send(getValidationErrorData(validationResult))
    }
    const { email, password, firstName, lastName, pin, shop } = req.body

    const availableShops = await Shop.find({})
    let foundShop
    availableShops.forEach((aShop) => {
      if (aShop.name === shop) {
        console.log(aShop)
        foundShop = aShop
      }
    })
    if (!foundShop) {
      return res.status(400).send({ message: 'Shop not available.' })
    }

    const signupotp = await SignupOTP.findOne({ shop: foundShop, otpExpires: { $gt: new Date() } })
    if (!signupotp) {
      return res.status(400).send({ message: 'No pin available. Please ask your admin to create one.' })
    }
    if (pin !== signupotp.pin) {
      return res.status(400).send({ message: 'Invalid pin.' })
    }

    signupotp.otpExpires = new Date()
    await signupotp.save()
    await authController.signup(email, password, firstName, lastName, foundShop)

    return res.status(200).send({ message: 'User was registered successfully!' })
  } catch (err) {
    return next(err)
  }
}

const signin: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(404).send({ message: 'Email or password missing.' })
    }

    const user = await authController.signin(email, password)
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

const requestSignupOTP: Handler = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).populate('mainShop').exec()
    if (user) {
      const pin = await authController.createSignupOTP(user, user.mainShop)
      return res.status(200).send({ pin })
    } else {
      return res.status(400).send({ message: "User not found!" })
    }

  } catch (err) {
    return next(err)
  }
}

const requestOTP: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(404).send({ message: 'Email or password missing.' })
    }

    await authController.createAndDeliverOTP(email, password)

    return res.status(200).send({ message: 'OTP successfully created.' })
  } catch (err) {
    return next(err)
  }
}

const signinWithOTP: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, otp } = req.body
    if (!email || !password) {
      return res.status(404).send({ message: 'Email or password missing.' })
    }

    const result = await authController.signinWithOTP(email, password, otp)
    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const authHandler = { signin, requestSignupOTP, signup, signinWithOTP, requestOTP }
export default authHandler

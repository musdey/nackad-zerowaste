import { Handler, NextFunction, Request, Response } from 'express'
import { UserValidator, getValidationErrorData } from '../lib/validator'
import authController from '../controller/auth.controller'

const signup: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = await UserValidator.validate(req.body)
    if (validationResult.length !== 0) {
      return res.status(400).send(getValidationErrorData(validationResult))
    }
    const { email, password, firstName, lastName, pin } = req.body
    if (pin !== '12341234') {
      return res.status(400).send({ message: 'Invalid pin.' })
    }

    await authController.signup(email, password, firstName, lastName)

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

const authHandler = { signin, signup, signinWithOTP, requestOTP }
export default authHandler

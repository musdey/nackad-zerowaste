import { Handler, NextFunction, Request, Response } from 'express'
import User from '../models/User'
import crypto from 'crypto'
import errors from '../lib/errors'
import sendMail from '../service/mailService'
import bcrypt from 'bcryptjs'
import { MailType } from '../types/index'
import ResetUserPassword from '../models/ResetUserPassword'

const EXPIRYTIME = 60 * 60 * 1000 // 1 hours

const passwordResetRequest: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email
  console.log(email)
  if (!email && typeof email !== 'string') {
    return res.status(400).send({ message: 'E-Mail address missing.', error: errors.InputMissing })
  }

  const user = await User.findOne({ email: email as string })

  if (!user) {
    return res.status(404).send({ message: 'Error', error: errors.BadRequest })
  }

  const token = await crypto.randomBytes(50).toString('hex')

  try {
    const restPW = await ResetUserPassword.findOne({
      email: email,
      resetPasswordExpires: { $gt: new Date() }
    })
    if (restPW) {
      restPW.resetPasswordExpires = new Date()
      await restPW.save()
    }

    const newResetPW = new ResetUserPassword({
      email: email,
      time: Date.now(),
      resetPasswordExpires: Date.now() + EXPIRYTIME,
      resetPasswordToken: token
    })

    const result = await newResetPW.save()

    try {
      await sendMail(user.username || user.firstName, email as string, token, MailType.RESETPW)
    } catch (err) {
      console.log(err)
    }
    return res.status(200).end('Successfully requested new password')
  } catch (err) {
    return next(err)
  }
}

const passwordResetCheckToken: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.params.token
  if (!token) {
    return res.status(400).end('Token missing')
  }
  const restPW = await ResetUserPassword.findOne({
    resetPasswordToken: token as string,
    resetPasswordExpires: { $gt: new Date() }
  })
  if (!restPW) {
    return res.status(400).end('Password reset token is invalid or has expired.')
  }

  return res.status(200).send('Token valid')
}

const passwordReset: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body
  console.log(data)
  if (!data.token || !data.pass) {
    return res.status(400).send({ message: 'Token or password missing.', error: errors.InputMissing })
  }

  const resetPassword = await ResetUserPassword.findOne({
    resetPasswordToken: data.token,
    resetPasswordExpires: { $gt: new Date() }
  })
  if (!resetPassword) {
    return res.status(404).send({ message: 'No PW request with this token found', error: errors.BadRequest })
  }

  console.log(resetPassword)
  try {
    const user = await User.findOne({ email: resetPassword.email })
    if (user) {
      user.password = bcrypt.hashSync(data.pass, 8)
      await user.save()
      resetPassword.resetPasswordExpires = new Date()
      await resetPassword.save()
      // TODO: inaktivate resetPassword object
    }
    return res.status(200).send({ message: 'New password has been set successfully.' })
  } catch (err) {
    return next(err)
  }
}

const passwordController = { passwordReset, passwordResetRequest, passwordResetCheckToken }
export default passwordController

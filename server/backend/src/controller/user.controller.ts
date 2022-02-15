import { Handler, NextFunction, Request, Response } from 'express'
import User from '../models/User'

const updateUserRole: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const newRole = req.body.role
    if (!newRole || !(newRole == 'ADMIN' || newRole == 'EMPLOYEE' || newRole == 'CUSTOMER')) {
      return res.status(404).send({ message: 'Role not set.' })
    }

    user.role = newRole
    user.save()

    return res.status(200).send('User role update successfully. ' + user.email + ' is now a ' + newRole)
  } catch (err) {
    return next(err)
  }
}

const getAllUsers: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().populate({ path: 'role', select: 'name -_id' }).select('-password -_id')
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate({ path: 'role', select: 'name -_id' })
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

export { updateUserRole, getUser, getAllUsers }

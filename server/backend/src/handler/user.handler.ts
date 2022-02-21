import { Handler, NextFunction, Request, Response } from 'express'
import usercontroller from '../controller/user.controller'

const updateUserRole: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  const email = req.body.email
  const newRole = req.body.role

  if (!newRole || !(newRole == 'ADMIN' || newRole == 'EMPLOYEE' || newRole == 'CUSTOMER')) {
    return res.status(404).send({ message: 'Role not set.' })
  }

  try {
    await usercontroller.updateRole(email, newRole)

    return res.status(200).send('User role update successfully. ' + email + ' is now a ' + newRole)
  } catch (err) {
    return next(err)
  }
}

const getAll: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usercontroller.getAll()
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getSelf: Handler = async (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  try {
    const user = await usercontroller.getOne(req.userId!)
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

const searchUser: Handler = async (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const searchString = req.body.searchString

  if (!searchString) {
    return res.status(404).send({ message: 'Role not set.' })
  }
  try {
    const user = await usercontroller.searchUser(searchString)
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

const userHandler = { updateUserRole, getAll, getSelf, searchUser }
export default userHandler

import { Handler, NextFunction, Request, Response } from 'express'
import usercontroller from '../controller/user.controller'

const updateUserRoleHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
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

const getAllUsersHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usercontroller.getAll()
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getUserHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Do input validation
  const email = req.body.email
  try {
    const user = usercontroller.getOne(email)
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

export { updateUserRoleHandler, getAllUsersHandler, getUserHandler }

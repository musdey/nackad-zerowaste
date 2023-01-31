import { Handler, NextFunction, Request, Response } from 'express'
import usercontroller from '../controller/user.controller'
import { IUser } from '../models/User'

const updateUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as IUser
  try {
    const result = await usercontroller.update(user)
    return res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}

const updateUserRole: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  const userId = req.body.userId
  const newRole = req.body.role

  if (!newRole || !(newRole == 'MANAGER' || newRole == 'EMPLOYEE' || newRole == 'CUSTOMER')) {
    return res.status(404).send({ message: 'Role not set.' })
  }

  try {
    const user = await usercontroller.updateRole(userId, newRole, req.mainShop)

    return res
      .status(200)
      .send(
        JSON.stringify({
          success: true,
          message: 'User role update successfully. ' + user.email + ' is now a ' + newRole
        })
      )
  } catch (err) {
    return next(err)
  }
}

const getAll: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usercontroller.getAll(req.mainShop)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getSelf: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usercontroller.getOne(req.userId!)
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

const searchUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const searchString = req.body.searchString

  if (!searchString) {
    return res.status(404).send({ message: 'Searchstring not set.' })
  }
  try {
    const user = await usercontroller.searchUser(searchString, req.mainShop)
    return res.status(200).send(user)
  } catch (err) {
    return next(err)
  }
}

const getEmployees: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usercontroller.getUserByRole('EMPLOYEE', req.mainShop)
    const user2 = await usercontroller.getUserByRole('MANAGER', req.mainShop)
    const result = user.concat(user2)

    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const userHandler = { updateUser, updateUserRole, getAll, getSelf, searchUser, getEmployees }
export default userHandler

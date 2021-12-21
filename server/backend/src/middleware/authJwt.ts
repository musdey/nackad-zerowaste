import jwt from 'jsonwebtoken'
import User from '../models/User'
import { NextFunction, Response } from 'express'

const secret = process.env.JWT_SECRET || 'test'

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers.authorization

  if (!token) {
    res.status(403).send({ message: 'No token provided!' })
    return
  }
  token = token.split(' ')[1]

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    req.userId = decoded.id
    next()
  })
}

const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  const IUser = await User.findById(req.userId).exec()
  if (!IUser) {
    res.status(500).send({ message: 'User not found!' })
    return
  }

  if (IUser.role === 'ADMIN') {
    next()
  } else {
    res.status(403).send({ message: 'Require Admin Role!' })
  }
}

const isShopOwner = async (req: any, res: Response, next: NextFunction) => {
  const IUser = await User.findById(req.userId).exec()
  if (!IUser) {
    res.status(500).send({ message: 'User not found!' })
    return
  }

  if (IUser.role === 'SHOPOWNER') {
    next()
  } else {
    res.status(403).send({ message: 'Require SHOPOWNER Role!' })
  }
}

const isEmployee = async (req: any, res: Response, next: NextFunction) => {
  const IUser = await User.findById(req.userId).exec()
  if (!IUser) {
    res.status(500).send({ message: 'User not found!' })
    return
  }

  if (IUser.role === 'SHOPOWNER' || IUser.role === 'EMPLOYEE') {
    next()
  } else {
    res.status(403).send({ message: 'Require Moderator Role!' })
  }
}

const isCustomer = async (req: any, res: Response, next: NextFunction) => {
  const IUser = await User.findById(req.userId).exec()
  if (!IUser) {
    res.status(500).send({ message: 'User not found!' })
    return
  }

  if (IUser.role === 'SHOPOWNER' || IUser.role === 'EMPLOYEE' || IUser.role === 'CUSTOMER') {
    next()
  } else {
    res.status(403).send({ message: 'Require Customer Role' })
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isShopOwner,
  isEmployee,
  isCustomer
}
export default authJwt

import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const secret = process.env.JWT_SECRET || 'someRandomTestString'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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
    const arr = decoded.extraAccess
    req.mainShop = decoded.mainShop
    req.userId = decoded.userId
    req.role = decoded.role
    req.access = arr
    next()
  })
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.role!.name === 'ADMIN') {
    next()
  } else {
    res.status(403).send({ message: 'Require Admin Role!' })
  }
}

const isManager = async (req: Request, res: Response, next: NextFunction) => {
  if (req.role!.name === 'ADMIN' || req.role!.name === 'MANAGER') {
    next()
  } else {
    res.status(403).send({ message: 'Require Manager Role!' })
  }
}

const isEmployee = async (req: Request, res: Response, next: NextFunction) => {
  if (req.role!.name === 'ADMIN' || req.role!.name === 'MANAGER' || req.role!.name === 'EMPLOYEE') {
    next()
  } else {
    res.status(403).send({ message: 'Require Employee Role!' })
  }
}

const isCustomer = async (req: Request, res: Response, next: NextFunction) => {
  if (
    req.role!.name === 'ADMIN' ||
    req.role!.name === 'MANAGER' ||
    req.role!.name === 'EMPLOYEE' ||
    req.role!.name === 'CUSTOMER'
  ) {
    next()
  } else {
    res.status(403).send({ message: 'Require Customer Role' })
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isEmployee,
  isCustomer
}
export default authJwt

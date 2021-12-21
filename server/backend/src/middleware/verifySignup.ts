import { NextFunction, Request, Response } from 'express'
import User from '../models/User'

const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction) => {
  // // Username
  // User.findOne({
  //   username: req.body.username
  // }).exec((err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (user) {
  //     res.status(400).send({ message: "Failed! Username is already in use!" });
  //     return;
  //   }

  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (user) {
      res.status(400).send({ message: 'Failed! Email is already in use!' })
      return
    }

    next()
  })
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail
}

export default verifySignUp

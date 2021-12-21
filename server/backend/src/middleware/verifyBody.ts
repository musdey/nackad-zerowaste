import { NextFunction, Request, Response } from 'express'
import errors from '../lib/errors'

const verifyBody = async (req: Request, res: Response, next: NextFunction) => {
  const body = await req.body
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).send(errors.InputMissing)
  }

  next()
}

export default verifyBody

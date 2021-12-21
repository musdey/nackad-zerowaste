import mongoose from 'mongoose'
import { RequestHandler } from 'express'

const dbNotUp: RequestHandler = (req, res, next) => {
  /** readyStates
   * 0 = disconnected
   * 1 = connected
   * 2 = connecting
   * 3 = disconnecting
   */
  if (mongoose.connection.readyState !== 1) {
    throw new Error("dbnotup")
  }
  next()
}

export default dbNotUp

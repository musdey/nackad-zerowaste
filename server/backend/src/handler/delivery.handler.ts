import { Handler, NextFunction, Request, Response } from 'express'
import deliverycontroller from '../controller/delivery.controller'

const getAllDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliverycontroller.getAll()
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getAllDeliveriesWithGivenStatus: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: do input validation
    const status = req.body.status
    const deliveries = await deliverycontroller.getAllWithStatus(status)
    return res.status(200).send(deliveries)
  } catch (err) {
    return next(err)
  }
}

const getCurrentOpenDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliverycontroller.getCurrent()
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getTodaysDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliverycontroller.getCurrent()
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const searchDelivery: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.body.query
    const users = await deliverycontroller.search(query)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const deliveryHandler = {
  getAllDeliveries,
  getAllDeliveriesWithGivenStatus,
  getCurrentOpenDeliveries,
  getTodaysDeliveries,
  searchDelivery
}
export default deliveryHandler

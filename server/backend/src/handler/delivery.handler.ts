import { Handler, NextFunction, Request, Response } from 'express'
import deliverycontroller from '../controller/delivery.controller'

const getAllDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliverycontroller.getAll(req.mainShop)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getAllDeliveriesWithGivenStatus: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: do input validation
    const status = req.body.status
    const deliveries = await deliverycontroller.getAllWithStatus(status, req.mainShop)
    return res.status(200).send(deliveries)
  } catch (err) {
    return next(err)
  }
}

const getCurrentOpenDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliveries = await deliverycontroller.getCurrent(req.mainShop)
    return res.status(200).send(deliveries)
  } catch (err) {
    return next(err)
  }
}

const getTodaysDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliverycontroller.getCurrent(req.mainShop)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const searchDelivery: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.body.query
    const users = await deliverycontroller.search(query, req.mainShop)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const updateDeliveryStatus: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const status = req.body.status

  if (!status) {
    return res.status(400).send('Input missing')
  }

  const shopifyOrder = await deliveryController.updateStatusById(req.params.id, status, req.mainShop)
  return res.status(200).send(shopifyOrder)
}

const deliveryHandler = {
  updateDeliveryStatus,
  getAllDeliveries,
  getAllDeliveriesWithGivenStatus,
  getCurrentOpenDeliveries,
  getTodaysDeliveries,
  searchDelivery
}
export default deliveryHandler

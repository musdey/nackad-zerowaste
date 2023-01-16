import { Handler, NextFunction, Request, Response } from 'express'
import deliveryController from '../controller/delivery.controller'

const getAllDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliveryController.getAll(req.mainShop)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const getAllDeliveriesWithGivenStatus: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: do input validation
    const status = req.body.status
    const deliveries = await deliveryController.getAllWithStatus(status, req.mainShop)
    return res.status(200).send(deliveries)
  } catch (err) {
    return next(err)
  }
}

const getCurrentOpenDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliveries = await deliveryController.getCurrent(req.mainShop)
    return res.status(200).send(deliveries)
  } catch (err) {
    return next(err)
  }
}

const getTodaysDeliveries: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deliveryController.getCurrent(req.mainShop)
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

const searchDelivery: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.body.query
    const users = await deliveryController.search(query, req.mainShop)
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

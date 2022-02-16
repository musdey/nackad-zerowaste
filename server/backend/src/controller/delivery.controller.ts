import { Handler, NextFunction, Request, Response } from 'express'
import DeliveryModel, { IDelivery } from '../models/Delivery'

const showAllOpenOrders: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const delivery = await DeliveryModel.find({ $or: [{ status: 'OPEN' }, { status: 'INDELIVERY' }] })

  return res.status(200).send(delivery)
}

export { showAllOpenOrders }

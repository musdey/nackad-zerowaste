import { Handler, NextFunction, Request, Response } from 'express'
import Config from '../Config'
import Address from '../types/address'
import Order from '../types/order'
import OrderModel from '../models/Order'

const createNewOrder: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('createNewOrder handler called')
  const incomingHeader = req.headers
  console.log('-------------------------------------------------------------------------------------------------------')
  //console.log(req.body)
  console.log('-------------------------------------------------------------------------------------------------------')
  const oneOrder = req.body as Order
  new OrderModel(oneOrder).save()
  const shippingAddress = oneOrder.shipping_address as Address

  return res.status(200).send('Public Content.')
}

export { createNewOrder }

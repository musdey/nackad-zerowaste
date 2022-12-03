import { Handler, NextFunction, Request, Response } from 'express'
import createNewNackadOrder from '../controller/orders/nackad.orders'
import orderController from '../controller/orders/orders.controller'
import createNewRexEatOrder from '../controller/orders/rexeat.orders'
import Cancellation from '../types/cancellation'
import DeliveryUpdate from '../types/deliveryupdate'
import Order from '../types/order'

// Webhook that is called when a new order is created on NACKAD webshop
const createNewNackadOrderHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Congratulations, a new order has been made!')
  const newOrder = req.body as Order
  try {
    await createNewNackadOrder(newOrder)
    return res.status(200).send('Public Content.')
  } catch (err) {
    console.log(err)
    return res.status(500).send('nok')
  }
}

// Webhook that is called when a new order is created on Rexeat webshop
const createNewRexeatOrderHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Congratulations, a new order has been made!')
  const newOrder = req.body as Order
  try {
    await createNewRexEatOrder(newOrder)
    return res.status(200).send('Public Content.')
  } catch (err) {
    console.log(err)
    return res.status(500).send('nok')
  }
}

// Webhook that is called if the fullfilment status of the order changes
const orderUpdates: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('order Delivered handler called')
  const update = req.body as DeliveryUpdate

  try {
    await orderController.orderUpdates(update)
    return res.status(200).send('Public Content.')
  } catch (err) {
    return res.status(500).send('nok')
  }
}
// Webhook order cancelled
const orderCancelled: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Cancel order handler has been calledcalled')
  const cancellation = req.body as Cancellation

  try {
    await orderController.orderCancelled(cancellation)
    return res.status(200).send('Public Content.')
  } catch (err) {
    return res.status(500).send('nok')
  }
}

const getAll: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getAll(req.mainShop)
  return res.status(200).send(order)
}
const getFuture: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getFuture(req.mainShop)
  return res.status(200).send(order)
}

const getToday: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getToday(req.mainShop)
  return res.status(200).send(order)
}

const getCurrent: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getCurrent(req.mainShop)
  return res.status(200).send(order)
}

const getShopifyOrderById: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const shopifyOrder = await orderController.getById(req.params.id, req.mainShop)
  return res.status(200).send(shopifyOrder)
}

const updateShopifyOrderById: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body as Order

  if (!order) {
    return res.status(400).send('Input missing')
  }

  const shopifyOrder = await orderController.updateById(req.params.id, order, req.mainShop)
  return res.status(200).send(shopifyOrder)
}

const orderHandler = {
  getShopifyOrderById,
  updateShopifyOrderById,
  orderUpdates,
  createNewNackadOrderHandler,
  createNewRexeatOrderHandler,
  orderCancelled,
  getAll,
  getCurrent,
  getFuture,
  getToday
}
export default orderHandler

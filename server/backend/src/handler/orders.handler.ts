import { Handler, NextFunction, Request, Response } from 'express'
import orderController from '../controller/orders.controller'
import Cancellation from '../types/cancellation'
import DeliveryUpdate from '../types/deliveryupdate'
import Order from '../types/order'

// Webhook that is called when a new order is created on webshop
const createNewOrder: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Congratulations, a new order has been made!')
  const newOrder = req.body as Order
  try {
    await orderController.createNewOrder(newOrder)
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
  const order = await orderController.getAll()
  return res.status(200).send(order)
}
const getFuture: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getFuture()
  return res.status(200).send(order)
}

const getToday: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getToday()
  return res.status(200).send(order)
}

const getCurrent: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderController.getCurrent()
  return res.status(200).send(order)
}

const orderHandler = { orderUpdates, createNewOrder, orderCancelled, getAll, getCurrent, getFuture, getToday }
export default orderHandler

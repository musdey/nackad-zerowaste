import { Handler, NextFunction, Request, Response } from 'express'
import deliverySlotController from '../controller/deliveryslot.controller'
import { IDeliverySlot } from '../models/DeliverySlots'

const getNackadPublic: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliverySlots = await deliverySlotController.getDeliverySlotsPublic('NACKAD')
    return res.status(200).send(deliverySlots)
  } catch (err) {
    return next(err)
  }
}

const getRexeatPublic: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliverySlots = await deliverySlotController.getDeliverySlotsPublic('REXEAT')
    return res.status(200).send(deliverySlots)
  } catch (err) {
    return next(err)
  }
}

const getAllManagement: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliverySlots = await deliverySlotController.getDeliverySlotsManagement(req.mainShop)
    return res.status(200).send(deliverySlots)
  } catch (err) {
    return next(err)
  }
}

const updateDeliverySlotById: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const deliverySlot = req.body as IDeliverySlot

  if (!deliverySlot) {
    return res.status(400).send('Input missing')
  }

  const slot = await deliverySlotController.updateById(req.params.id, deliverySlot, req.mainShop)
  return res.status(200).send(slot)
}

const addSlot: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('handler called')
  const body = req.body
  if (!body || !body.deliverySlotId) {
    return res.status(404).send('Missing input {deliverySlotId}')
  }

  const deliveryDay = body.deliverySlotId

  try {
    const deliverySlot = await deliverySlotController.updateSlot(deliveryDay, req.userId!, 'ADD', req.mainShop)
    return res.status(200).send(deliverySlot)
  } catch (err) {
    return next(err)
  }
}

const removeSlot: Handler = async (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const body = req.body
  if (!body || !body.deliverySlotId) {
    return res.status(404).send('Missing {deliverySlotId}')
  }

  const deliveryDay = body.deliverySlotId

  try {
    const deliverySlot = await deliverySlotController.updateSlot(deliveryDay, req.userId!, 'REMOVE', req.mainShop)
    return res.status(200).send(deliverySlot)
  } catch (err) {
    return next(err)
  }
}

const deliverySlotHandler = {
  updateDeliverySlotById,
  getNackadPublic,
  getRexeatPublic,
  getAllManagement,
  addSlot,
  removeSlot
}
export default deliverySlotHandler

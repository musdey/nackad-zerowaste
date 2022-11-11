import { Handler, NextFunction, Request, Response } from 'express'
import deliverySlotController from '../controller/deliveryslot.controller'

const getAllPublic: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliverySlots = await deliverySlotController.getDeliverySlotsPublic()
    return res.status(200).send(deliverySlots)
  } catch (err) {
    return next(err)
  }
}

const getRexeatPublic: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliverySlots = await deliverySlotController.getRexeatSlotsPublic()
    return res.status(200).send(deliverySlots)
  } catch (err) {
    return next(err)
  }
}

const getAllManagement: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deliverySlots = await deliverySlotController.getDeliverySlotsManagement()
    return res.status(200).send(deliverySlots)
  } catch (err) {
    return next(err)
  }
}

const addSlot: Handler = async (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const body = req.body
  if (!body || !body.deliverySlotId) {
    return res.status(404).send('Missing input {deliverySlotId}')
  }

  const deliveryDay = body.deliverySlotId

  try {
    const deliverySlot = await deliverySlotController.updateSlot(deliveryDay, req.userId!, 'ADD')
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
    const deliverySlot = await deliverySlotController.updateSlot(deliveryDay, req.userId!, 'REMOVE')
    return res.status(200).send(deliverySlot)
  } catch (err) {
    return next(err)
  }
}

const deliverySlotHandler = {
  getAllPublic,
  getRexeatPublic,
  getAllManagement,
  addSlot,
  removeSlot
}
export default deliverySlotHandler

import { Handler, NextFunction, Request, Response } from 'express'
import settingsController from '../controller/settings.controller'

const getSettingsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  try {
    const settings = await settingsController.getSettings(req.mainShop)

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

const getSettingsAdminHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  try {
    const settings = await settingsController.getSettingsAdmin(req.mainShop)

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

const updateSettingsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  console.log(body)
  if (!body || !body.deliverySlots || !body.useHourlySlots || !body.showSlotDaysInAdvance) {
    return res.status(404).send('Missing Body')
  }

  try {
    const settings = await settingsController.updateSettings(
      body.useHourlySlots,
      body.deliverySlots,
      body.showSlotDaysInAdvance,
      req.mainShop
    )

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

const getStatistics: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await settingsController.getStatistics(req.mainShop)

    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const settingsHandler = { getSettingsHandler, updateSettingsHandler, getSettingsAdminHandler, getStatistics }
export default settingsHandler

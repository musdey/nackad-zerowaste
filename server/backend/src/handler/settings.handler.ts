import { Handler, NextFunction, Request, Response } from 'express'
import settingsController from '../controller/settings.controller'

const getSettingsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  try {
    const settings = await settingsController.getSettings()

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

const getSettingsAdminHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  try {
    const settings = await settingsController.getSettingsAdmin()

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

const updateSettingsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  if (!body || !body.deliveryAreas || !body.deliveryHours || !body.slotsPerVehicle || !body.vehicles) {
    return res.status(404).send('Missing Body')
  }

  try {
    const settings = await settingsController.updateSettings(
      body.deliveryAreas,
      body.deliveryHours,
      body.slotsPerVehicle,
      body.vehicles,
      body.extraSlots,
      body.showSlotDaysInAdvance
    )

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

const getStatistics: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await settingsController.getStatistics()

    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const settingsHandler = { getSettingsHandler, updateSettingsHandler, getSettingsAdminHandler, getStatistics }
export default settingsHandler

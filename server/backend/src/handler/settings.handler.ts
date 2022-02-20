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

const updateSettingsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: do input validation

  const body = req.body
  if (!body || !body.deliveryAreas || !body.deliveryHours) {
    return res.status(404).send('Missing Body')
  }

  // if (!('monday' in body.deliverHours || ))
  try {
    const settings = await settingsController.updateSettings(body.deliveryAreas, body.deliveryHours)

    return res.status(200).send(settings)
  } catch (err) {
    return next(err)
  }
}

export { getSettingsHandler, updateSettingsHandler }

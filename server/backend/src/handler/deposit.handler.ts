import { Handler, NextFunction, Request, Response } from 'express'
import depositcontroller from '../controller/deposit.controller'

const getDepositById: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const depositId = req.params.id
  if (!depositId) {
    return res.status(404).send('DepositId missing')
  }

  try {
    const deposit = await depositcontroller.getDepositById(depositId)
    return res.status(200).send(deposit)
  } catch (err) {
    return next(err)
  }
}

const getDepositTypes: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const depositTypes = await depositcontroller.getDepositTypes(req.mainShop)
    return res.status(200).send(depositTypes)
  } catch (err) {
    return next(err)
  }
}

const getAggregatedDeposit: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  if (!userId) {
    return res.status(404).send('UserId missing')
  }

  try {
    const deposit = await depositcontroller.getAggregatedDepositByUserId(userId)
    return res.status(200).send(deposit)
  } catch (err) {
    return next(err)
  }
}

const getDepositByUserId: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Do input validation

  const userId = req.params.id
  if (!userId) {
    return res.status(404).send('Userid missing')
  }

  try {
    const deposit = await depositcontroller.getDepositByUserId(userId, req.mainShop)
    return res.status(200).send(deposit)
  } catch (err) {
    return next(err)
  }
}

const getDepositByWebShopUserId: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const webShopUserId = req.params.webShopUserId
  if (!webShopUserId) {
    return res.status(404).send('Userid missing')
  }

  try {
    const deposit = await depositcontroller.getDepositByWebShopUserId(webShopUserId)
    return res.status(200).send(deposit)
  } catch (err) {
    return next(err)
  }
}

const returnDeposit: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId
  const returnedItems = req.body.returnedItems

  if (!returnedItems) {
    return res.status(404).send('[returnedItems] missing')
  }

  if (!userId) {
    return res.status(404).send('UserId must be provided.')
  }
  try {
    const result = await depositcontroller.returnDeposit(userId, returnedItems, req.mainShop)
    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const addNewDeposit: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId
  const type = req.body.type
  const amount = req.body.amount
  const depositTypeId = req.body.depositTypeId
  const depositId = req.body.depositId

  if (!amount) {
    return res.status(404).send('Amount missing')
  }

  if (!userId && !depositId) {
    return res.status(404).send('One of the params depositId or userId must be provided')
  }

  if (!depositTypeId && !type) {
    return res.status(404).send('One of the params userId or deliveryId must be provided.')
  }
  try {
    const result = await depositcontroller.addNewDeposit(userId, type, amount, req.mainShop, depositTypeId, depositId)
    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const depositHandler = {
  getAggregatedDeposit,
  getDepositByUserId,
  getDepositById,
  getDepositByWebShopUserId,
  returnDeposit,
  addNewDeposit,
  getDepositTypes
}
export default depositHandler

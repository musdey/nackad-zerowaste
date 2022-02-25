import { Handler, NextFunction, Request, Response } from 'express'
import depositcontroller from '../controller/deposit.controller'

const getDepositById: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const depositId = req.params.id
  if (!depositId) {
    return res.status(404).send('DepositId missing')
  }

  try {
    const users = await depositcontroller.getDepositById(depositId)
    return res.status(200).send(users)
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
    const deposit = await depositcontroller.getDepositByUserId(userId)
    return res.status(200).send(deposit)
  } catch (err) {
    return next(err)
  }
}

const getDepositByShopifyId: Handler = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Do input validation

  const shopifyUserId = req.params.shopifyUserId
  if (!shopifyUserId) {
    return res.status(404).send('Userid missing')
  }

  try {
    const deposit = await depositcontroller.getDepositByShopifyId(shopifyUserId)
    return res.status(200).send(deposit)
  } catch (err) {
    return next(err)
  }
}

const updateDeposit: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const depositId = req.body.depositId
  const deliveryId = req.body.deliveryId
  const returnedItems = req.body.returnedItems

  if (!depositId || !deliveryId || !returnedItems) {
    return res.status(404).send('One of the params depositId, deliveryId, [returnedItems] is missing.')
  }

  try {
    const result = await depositcontroller.updateDeposit(depositId, deliveryId, returnedItems)
    return res.status(200).send(result)
  } catch (err) {
    return next(err)
  }
}

const depositHandler = { getDepositByUserId, getDepositById, getDepositByShopifyId, updateDeposit }
export default depositHandler

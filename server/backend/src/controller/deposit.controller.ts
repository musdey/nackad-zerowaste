import { Handler, NextFunction, Request, Response } from 'express'
import DepositItemModel from '../models/DepositItem'

const getDepositsByCustomer: Handler = async (req: Request, res: Response, next: NextFunction) => {
  //const openDeposits = await DepositItemModel.find({shopifyOrder:})
  return res.status(200).send('Public Content.')
}

export { getDepositsByCustomer }

import { IRole } from '../models/Role'

export as namespace myTypes

declare global {
  namespace Express {
    export interface Request {
      userId?: string
      mainShop: string
      role: IRole
      access?: string[]
    }
  }
}

export const enum MailType {
  OTP = 'OTP',
  RESETPW = 'RESETPW',
  VERIFYMAIL = 'VERIFYMAIL'
}

export const enum DepositStatus {
  OPEN = 'OPEN',
  PARTIALLYRETURNED = 'PARTIALLYRETURNED',
  RETURNED = 'RETURNED',
  PAID = 'PAID',
  PARTIALLYPAID = 'PARTIALLYPAID'
}

export as namespace myTypes

export const enum MailType {
  OTP = 'OTP',
  RESETPW = 'RESETPW',
  VERIFYMAIL = 'VERIFYMAIL'
}

export const enum DepositStatus {
  OPEN = 'OPEN',
  PARTIALLYRETURNED = 'PARTIALLYRETURNED',
  RETURNED = 'RETURNED'
}

import Validator, { ValidationError } from 'validate'
import InputValidationError from './errors'

const UserValidator: Validator = new Validator({
  // _id let it autogenerate by mongodb
  // username: {
  //   type: String
  // },
  // firstName: {
  //   type: String
  // },
  // lastName: {
  //   type: String
  // },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // phoneNumber: {
  //   type: String
  // }
})

const LoginValidator = new Validator({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const getValidationErrorData = function (validationResult: ValidationError[]): string {
  const resultArr: string[] = []
  validationResult.forEach((err) => {
    resultArr.push(err.toString())
  })
  const result = { error: resultArr }
  if (process.env.NODE_ENV === 'development') {
    return result.toString()
  }
  return 'InputValidationError'
}

export {
  LoginValidator,
  UserValidator,
  getValidationErrorData
}

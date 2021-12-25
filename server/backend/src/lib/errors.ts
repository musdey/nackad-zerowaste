interface ResponseError {
  code: string
  title: string
  message?: string
}

const BadRequest: ResponseError = { code: '400', title: 'Bad request' }
const NotFound: ResponseError = { code: '404', title: 'Resource not found' }
const Unauthorized: ResponseError = { code: '401', title: 'User is not authorized' }
const WrongPassword: ResponseError = { code: '401', title: 'Wrong password' }
const Forbidden: ResponseError = { code: '403', title: 'User is not allowed to access this resourced' }
const InternalServer: ResponseError = { code: '500', title: 'Internal server error' }
const InputMissing: ResponseError = { code: '401', title: 'Wrong or missing parameters' }

const errors = {
  NotFound,
  Unauthorized,
  Forbidden,
  InternalServer,
  BadRequest,
  WrongPassword,
  InputMissing
}

export default errors

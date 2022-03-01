// test/post.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import User, { IUser } from '../../src/models/User'
import * as dbHandler from './db'
import authController from '../../src/controller/auth.controller'

beforeAll(async () => {
  await dbHandler.createTestDB()
  await dbHandler.connect()
})

afterEach(async () => {
  await dbHandler.clearDatabase()
})

afterAll(async () => {
  await dbHandler.closeDatabase()
})

describe('Test auth.controller', () => {
  it('successfully signs up new user', async () => {
    const user = { email: 'test@test.at', firstName: 'Test', lastName: 'User', password: 'password' }
    await authController.signup(user.email, user.password, user.firstName, user.lastName)
    const createdUser = await User.findOne({ email: user.email })
    if (createdUser) {
      expect(createdUser.firstName).toEqual(user.firstName)
    }
  })
  it('successfully logs in the user', async () => {
    const user = { email: 'login@test.at', firstName: 'Login', lastName: 'User', password: 'password' }
    await authController.signup(user.email, user.password, user.firstName, user.lastName)
    const login = await authController.signin(user.email, user.password)
    if (login) {
      expect(login.accessToken.length).toBeGreaterThan(0)
    }
  })

  it('catches wrong password', async () => {
    const user = { email: 'login2@test.at', firstName: 'Fail', lastName: 'User', password: 'password' }
    await authController.signup(user.email, user.password, user.firstName, user.lastName)
    try {
      await authController.signin(user.email, 'wrong-password')
    } catch (err: any) {
      expect(err.message).toBe('Invalid password.')
    }
  })

  it('catches not existing user', async () => {
    const user = { email: 'login3@test.at', firstName: 'Fail', lastName: 'User', password: 'password' }
    await authController.signup(user.email, user.password, user.firstName, user.lastName)
    try {
      await authController.signin('user@notexisting', 'password')
    } catch (err: any) {
      expect(err.message).toBe('User Not found.')
    }
  })
})

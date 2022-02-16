// test/post.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import User, { IUser } from '../../src/models/User'
import * as dbHandler from './db'

beforeAll(async () => {
  await dbHandler.createTestDB()
  await dbHandler.connect()
  const user: IUser = new User()
  user.firstName = 'Test'
  user.lastName = 'User'
  user.email = 'test@user.at'
  user.password = 'examplepw'
  await user.save()
})

afterEach(async () => {
  await dbHandler.clearDatabase()
})

afterAll(async () => {
  await dbHandler.closeDatabase()
})

describe('Test deposit', () => {
  it('cheks whether first order is successfully stored', async () => {
    // Simulate Order webhook

    // Check if user is created successfully

    // Check if Deposit is created successfully

    // Check if DepositItems are created successfully

    expect.assertions(2)

    const userInDb = await User.findOne({ firstName: 'Test' }).populate('role').exec()
    console.log('User document from memory-db', userInDb)
    if (userInDb) {
      // check that title is expected
      expect(userInDb.lastName).toEqual('User')
      // check that content is expected
      expect(userInDb.role.name).toEqual('CUSTOMER')
    }
  })
})

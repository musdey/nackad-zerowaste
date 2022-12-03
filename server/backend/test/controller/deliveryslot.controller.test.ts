// test/post.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import User, { IUser } from '../../src/models/User'
import * as dbHandler from './db'
import deliveryslotController from '../../src/controller/deliveryslot.controller'

describe('Test deliveryslot.controller', () => {
  it('Tests valid times', async () => {
    const t = deliveryslotController.getNextValidDate()
    console.log(t)
  })
})

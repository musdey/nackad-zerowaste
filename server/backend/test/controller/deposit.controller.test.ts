// test/post.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import User from '../../src/models/User'
import * as dbHandler from './db'
import orderController from '../../src/controller/orders.controller'
import Order from '../../src/types/order'
import DepositModel from '../../src/models/Deposit'
import Product from '../../src/models/Product'
import OrderModel from '../../src/models/Order'

beforeAll(async () => {
  await dbHandler.createTestDB()
  await dbHandler.connect()
  new Product({
    deposit: 'Saftflasche-020',
    shopifyId: '7470551662839'
  }).save()
  new Product({
    deposit: 'Bierkiste-480',
    shopifyId: '7530393731319'
  }).save()
})

afterEach(async () => {
  await dbHandler.clearDatabase()
})

afterAll(async () => {
  await dbHandler.closeDatabase()
})

describe('Test creation deposit + deposititems', () => {
  it('cheks whether first order is successfully stored', async () => {
    const order: Order = await require('./depositcontroller.json')
    await orderController.createNewOrder(order)

    expect.assertions(4)

    const userInDb = await User.findOne({ firstName: 'Mustafa' }).populate('role').exec()
    if (userInDb) {
      expect(userInDb.lastName).toEqual('Cicek')
      expect(userInDb.role.name).toEqual('CUSTOMER')
    }

    const deposit = await DepositModel.findOne({ customer: userInDb }).populate('depositItems')
    expect(deposit.totalPrice).toEqual('980')
    expect(deposit.depositItems.length).toEqual(3)
  })
})

describe('Test multiple orders', () => {
  it('check whether multiple orders are created', async () => {
    const order: Order = await require('./depositcontroller.json')
    const order2 = { ...order }
    order2.note_attributes = [
      { name: 'deliveryDay', value: '2022-03-11' },
      { name: 'timeslot', value: '15:00-16:00' }
    ]
    const order3 = { ...order }
    order3.note_attributes = [
      { name: 'deliveryDay', value: '2022-03-12' },
      { name: 'timeslot', value: '19:00-20:00' }
    ]
    // await orderController.createNewOrder(order)
    // await orderController.createNewOrder(order2)
    // await orderController.createNewOrder(order3)
    // const orders = await OrderModel.find({})
  })
})

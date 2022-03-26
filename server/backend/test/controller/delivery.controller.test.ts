// test/post.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import * as dbHandler from './db'
import deliveryController from '../../src/controller/delivery.controller'
import Product from '../../src/models/Product'
import orderController from '../../src/controller/orders.controller'
import Order from '../../src/types/order'

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
  const order: Order = await require('./depositcontroller.json')
  const order2 = { ...order }
  order.note_attributes = [
    { name: 'deliveryDay', value: '2023-03-11' },
    { name: 'timeslot', value: '15:00-16:00' }
  ]
  order2.note_attributes = [
    { name: 'deliveryDay', value: '2023-03-12' },
    { name: 'timeslot', value: '17:00-18:00' }
  ]
  order2.id = 'someotherId'
  const order3 = { ...order }
  order3.id = 'someotherOtherId'
  order3.note_attributes = [
    { name: 'deliveryDay', value: '2023-03-11' },
    { name: 'timeslot', value: '19:00-20:00' }
  ]
  await orderController.createNewOrder(order)
  await orderController.createNewOrder(order2)
  await orderController.createNewOrder(order3)
})

afterEach(async () => {
  await dbHandler.clearDatabase()
})

afterAll(async () => {
  await dbHandler.closeDatabase()
})

describe('Test delivery.controller', () => {
  it('successfully gets deliveries per function', async () => {
    const deliveries = await deliveryController.getAll()
    expect(deliveries.length).toBe(3)

    const deliveries2 = await deliveryController.getAllWithStatus('OPEN')
    expect(deliveries2.length).toBe(3)
    // const del = await DeliveryModel.findOne({ 'delilverySlot.slotHours': '19:00-20:00' })
    // if (del) {
    //   del.status = 'DELIVERED'
    //   await del.save()
    // }
    // const deliverUpdates = await deliveryController.getAllWithStatus('OPEN')
    // expect(deliverUpdates.length).toBe(2)
    // const deliveries3 = await deliveryController.getAll()
    // expect(deliveries3.length).toBe(3)
  })
})

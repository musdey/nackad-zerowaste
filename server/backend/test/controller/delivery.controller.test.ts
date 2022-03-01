// test/post.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import User from '../../src/models/User'
import * as dbHandler from './db'
import deliveryController from '../../src/controller/delivery.controller'
import Product from '../../src/models/Product'
import orderController from '../../src/controller/orders.controller'
import Order from '../../src/types/order'
import DeliveryModel from '../../src/models/Delivery'
import deliverySlotController from '../../src/controller/deliveryslot.controller'

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
    { name: 'deliveryDay', value: new Date().toLocaleDateString() },
    { name: 'timeslot', value: '15:00-16:00' }
  ]
  order2.note_attributes = [
    { name: 'deliveryDay', value: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString() },
    { name: 'timeslot', value: '17:00-18:00' }
  ]
  const order3 = { ...order }
  order3.note_attributes = [
    { name: 'deliveryDay', value: new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString() },
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
    console.log(deliveries)
    expect(deliveries.length).toBe(3)

    const deliveries2 = await deliveryController.getAllWithStatus('OPEN')
    console.log(deliveries2)
    expect(deliveries2.length).toBe(3)
    // const del = await DeliveryModel.findOne({ 'delilverySlot.slotHours': '19:00-20:00' })
    // if (del) {
    //   del.status = 'DELIVERED'
    //   await del.save()
    // }
    // const deliverUpdates = await deliveryController.getAllWithStatus('OPEN')
    // expect(deliverUpdates.length).toBe(2)
    const deliveries3 = await deliveryController.getTodays()
    console.log(deliveries3)
    expect(deliveries3.length).toBe(1)
  })
})

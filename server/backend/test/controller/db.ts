// test/db.ts
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Role from '../../src/models/Role'
import deliverySlotController from '../../src/controller/deliveryslot.controller'
import ShopSettings from '../../src/models/ShopSettings'

let mongod: MongoMemoryServer
export const createTestDB = async () => {
  mongod = await MongoMemoryServer.create()
}
/**
 * Connect to mock memory db.
 */
export const connect = async () => {
  if (!mongod) return
  const uri = await mongod.getUri()

  await mongoose.connect(uri)
  await new Role({ name: 'CUSTOMER' }).save()
  await new Role({ name: 'EMPLOYEE' }).save()
  await new Role({ name: 'ADMIN' }).save()
  const newSetting = new ShopSettings({
    deliveryAreas: '1020;1030;1040;1050;1060;1070;1080;1090;1120;1130;1140;1150;1160;1170;1180',
    deliveryHours: {
      monday: '15:00-20:00',
      tuesday: '15:00-20:00',
      wednesday: '15:00-20:00',
      thursday: '15:00-20:00',
      friday: '15:00-20:00',
      saturday: '15:00-20:00',
      sunday: 'closed'
    }
  })
  await newSetting.save()
  await deliverySlotController.createDeliverySlots()
}

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  if (!mongod) return
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

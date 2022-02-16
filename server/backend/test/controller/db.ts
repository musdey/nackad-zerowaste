// test/db.ts
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Role from '../../src/models/Role'

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

import mongoose from 'mongoose'

/**
 * @param defaultTimeoutForQuery in MS
 */
const connect = async (
  host: string,
  port: number,
  username?: string,
  password?: string,
  database?: string,
  defaultTimeoutForQuery?: number
): Promise<void> => {
  const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`
  try {
    await mongoose.connect(connectionString, {
      connectTimeoutMS: defaultTimeoutForQuery
    })
    console.log(`[Mongoose] Connected to ${host}:${port}/${database}`)
  } catch (err) {
    console.log(`[Mongoose] ${err}`)
  }
}

export default connect

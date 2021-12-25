import mongoose from 'mongoose'

const disconnect = async () => {

  const database = mongoose.connection
  if (database) {
    await mongoose.disconnect();
  }

};

export default disconnect
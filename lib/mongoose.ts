import mongoose from 'mongoose'

let isConnected = false

export async function connectToDatabase() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGO_URL!)
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

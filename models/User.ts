import mongoose, { Schema, Document, models } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}, { timestamps: true })

export const User = models.User || mongoose.model<IUser>('User', userSchema)

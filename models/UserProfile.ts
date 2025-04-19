import mongoose, { Schema, Document, models } from 'mongoose'

export interface IUserProfile extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  collegeName: string
  semester: number
  github: string
  leetcode: string
}

const userProfileSchema = new Schema<IUserProfile>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collegeName: { type: String, required: true },
  semester: { type: Number, required: true },
  github: { type: String, required: true },
  leetcode: { type: String, required: true },
}, { timestamps: true })

export const UserProfile = models.UserProfile || mongoose.model<IUserProfile>('UserProfile', userProfileSchema)

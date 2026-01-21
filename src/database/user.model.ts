import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
    require: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user"
  },
  image: {
    type: String,
    require: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isBanned:{
    type:Boolean,
    default:false
  },
  deletedAt:{
    type:Date
  },
  deleteBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
},{timestamps:true})

export type UserType = mongoose.InferSchemaType<typeof userSchema>

export const User = mongoose.model("User",userSchema)


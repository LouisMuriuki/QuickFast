import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    packageId:{
      type:String,
    },
    location:{
      type:String,
    },
    totalbilled:{type:Number,default:0}

  },
  { timestamps: true }
);

const User=mongoose.model("User",userSchema)

export default User
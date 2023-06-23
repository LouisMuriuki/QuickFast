import mongoose from "mongoose";

const refreshTokenSchema=new mongoose.Schema({
    refreshToken:{type:String,required:false,trim:false},
    userid:{type:String,required:false,trim:false}
})

const RefreshToken=mongoose.model("RefreshToken",refreshTokenSchema)

export default RefreshToken
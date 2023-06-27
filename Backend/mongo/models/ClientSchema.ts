import mongoose from "mongoose";

export const ClientSchema=new mongoose.Schema(
    {
        ownerId:{type:String,required:true,},
        name:{type:String,required:true},
        address:{type:String},
        city:{type:String},
        zipcode:{type:String},
        country:{type:String},
        email:{type:String,required:true},
        phone:{type:String},
        website:{type:String},
        total_billed:{type:Number},
        total_paid:{type:Number}
    }, { timestamps: true }
)

const Client=mongoose.model("Client",ClientSchema)

export default Client
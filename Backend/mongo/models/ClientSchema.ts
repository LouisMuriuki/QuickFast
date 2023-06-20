import mongoose from "mongoose";

const ClientSchema=new mongoose.Schema(
    {
        client_name:{type:String,required:true,unique:true},
        client_address:{type:String},
        client_city:{type:String},
        client_country:{type:String},
        client_email:{type:String,required:true,unique:true},
        client_phone:{type:String},
        total_billed:{type:Number},
        total_paid:{type:Number}
    }
)

const Client=mongoose.model("Client",ClientSchema)

export default Client
const mongoose=require('mongoose')

const AddressSchema = new mongoose.Schema({
  userId:String,
  address:String,
  city:String,
  pinCode:String,
  state:String,
  phone:String,
  landmark:String
},{timestamps:true})

module.exports =mongoose.model("Adderss",AddressSchema)
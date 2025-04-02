const mongoose=require("mongoose")

const LocationSchema=mongoose.Schema({
  address:String,
  state:String,
  country:String
})

module.exports=mongoose.model('Location',LocationSchema)
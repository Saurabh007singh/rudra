const mongoose=require("mongoose")

const ImageSchema=new mongoose.Schema({
  productId:String,
 images:[String],
})

module.exports=mongoose.model("Image",ImageSchema) 
const mongoose=require("mongoose")

const ReviewSchema=new mongoose.Schema({
  userId:String,
  productReview:[{
    productId:String,
    review:String,
    stars:Number
  }]
  })

module.exports=mongoose.model("Review",ReviewSchema)
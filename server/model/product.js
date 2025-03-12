const mongoose=require("mongoose")

const ProductSchema=new mongoose.Schema({
  image:String,
  title:String,
  description:String,
  brand:String,
  price:String,
  salePrice:Number,
  totalStock:Number,
  starProduct:String,
  category:String

},{
  timestamps:true
})

module.exports=mongoose.model('Product',ProductSchema)
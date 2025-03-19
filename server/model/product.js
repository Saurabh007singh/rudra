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
  category:String,
  productCode:Number,
  offer:String,
  features:String,
  size:String,
  productsIncluded:String,
  returns:String,
  careInstructions:String,
  moreInfo:String
},{
  timestamps:true
})

module.exports=mongoose.model('Product',ProductSchema)
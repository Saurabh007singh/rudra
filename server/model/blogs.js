const mongoose=require("mongoose")

const BlogSchema=new mongoose.Schema({
  image:String,
  title:String,
  content:String,
},{timestamps:true})

module.exports=mongoose.model("Blog",BlogSchema)
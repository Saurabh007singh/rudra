const mongoose=require("mongoose")

const OrderSchema=new mongoose.Schema({
  userId:String,
  cartItems:[{
    productId:String,
    title:String,
    image:String,
    salePrice:String,
    quantity:Number  
  }],
  address:{
    addressId:String,
    address:String,
    city:String,
    pinCode:String,
    phone:String,
    notes:String,
  },
  orderStatus:String,
  paymentMethod:String,
  paymentStatus:String,
  totalAmount:Number,
  orderDate:Date,
  orderUpdateDate:Date,
  paymentId:String,
  payerId:String

})

module.exports=mongoose.Model("Order",OrderSchema)
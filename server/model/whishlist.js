const mongoose = require("mongoose");

const WhishListSchema = new mongoose.Schema({
  userId: String,
  productId:[String],
});

module.exports=mongoose.model("Whish",WhishListSchema)

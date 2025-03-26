const mongoose=require("mongoose")


const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // reference to the Product model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Ratings between 1 to 5
    },
    reviewText: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("Review",ReviewSchema)
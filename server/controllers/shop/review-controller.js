const Review=require("../../model/review");
const Product=require("../../model/product");
const User=require("../../model/user");
const Order=require("../../model/order");



const addReview=async(req,res)=>{
 
try {
  
  const {productId,userId,rating,reviewText}=req.body;


    const product=await Product.findById(productId);

    if(!product){
      
      return res.status(404).json({
      success:false,
      message:"product not found"
    })}

    const user=await User.findById(userId);
    if(!user){
      
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }
    
    const order=await Order.findOne({
    userId:userId,
    "cartItems.productId":productId,
    orderStatus:"delivered"
    })


    if(!order){
      return res.status(400).json({success:false,
        message:"you have not purchased the item "}
      )
    }

    const existingReview=await Review.findOne({productId,userId});
    if(existingReview){
      existingReview.rating=rating;
      existingReview.reviewText=reviewText;
      existingReview.updatedAt=Date.now();
      
      await existingReview.save();
    return res.status(200).json({message:"review updated successfully",data:existingReview});
    }else{
      const newReview=new Review({
        productId,
        userId,
        rating,
        reviewText
      });

      await newReview.save();
      return res.status(201).json({
        message: "Review added successfully",
        data: newReview,
      });
    }

    
  
} catch (error) {
  res.status(500).json({
    success: false,
    message: "An error occurred while adding or updating the review",
  });
}
}

const getReviews=async(req,res)=>{
try {
  const {productId}=req.params;

  const reviews=await Review.find({productId}).populate("userId","userName").sort({createdAt:-1})

  if(!reviews.length){
    return res.status(404).json({ message: "No reviews found for this product" });
  }
  res.status(200).json({ data:reviews });
} catch (error) {
  res.status(500).json({ message: "Server error" });
}
}

module.exports={addReview,getReviews}
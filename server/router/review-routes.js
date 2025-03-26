const express=require("express")
const reviewController=require("../controllers/shop/review-controller")
const router=express.Router()

router.post("/add",reviewController.addReview)
router.get("/get/:productId",reviewController.getReviews)


module.exports=router

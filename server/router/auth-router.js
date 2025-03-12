const express=require("express")
const authController=require("../controllers/auth/authcontroller")

const router=express.Router()

router.route("/login").post(authController.login)
router.route("/register").post(authController.registerUser)
router.route("/logout").post(authController.logout)
router.route("/check-auth").get(authController.authMiddleware,(req,res)=>{const user=req.user;res.status(200).json({success:true,message:"Authenticated user",user})})
// router.get("/check-auth",authController.authMiddleware,(req,res)=>{})


module.exports=router

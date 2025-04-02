const express=require("express")
const location=require("../controllers/shop/location-controller")
const router=express.Router()

router.post("/location",location.saveLocation)

module.exports=router
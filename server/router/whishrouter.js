const express=require("express")
const {addToWhish,deletefromWhish,fetchWhishList}=require("../controllers/shop/whish-list-controller")
const router=express.Router()

router.post("/add",addToWhish)
router.get("/get/:userId",fetchWhishList)
router.delete("/delete/:userId/:productId",deletefromWhish)

module.exports=router
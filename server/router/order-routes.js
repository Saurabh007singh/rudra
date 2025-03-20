const express=require("express")
const orderController=require("../controllers/shop/order-controller")

const router=express.Router()

router.post("/create",orderController.createOrder)
router.post("/update",orderController.changeOrderStatus)
router.get("/get/:userId",orderController.getAllOrders)

module.exports = router
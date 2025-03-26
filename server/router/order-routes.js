const express=require("express")
const orderController=require("../controllers/shop/order-controller")

const router=express.Router()

router.post("/create",orderController.createOrder)
router.put("/update/:orderId",orderController.changeOrderStatus)
router.get("/get/:userId",orderController.getAllOrders)
router.get("/get/single/:orderId",orderController.getSingleOrder)
router.get("/get/user/:userId",orderController.getUserOrders)
router.delete("/delete/:orderId",orderController.deleteOrder)


module.exports = router
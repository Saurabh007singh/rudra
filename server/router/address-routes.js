const express=require("express");

const address = require("../controllers/shop/address-controller");

const router=express.Router();

router.post("/add",address.addAddress)
router.get("/get/:userId",address.fetchAllAddress)
router.delete("/delete/:userId/:addressId",address.deleteAddress)
router.put('/update/:userId/:addressId',address.editAddress)

module.exports=router
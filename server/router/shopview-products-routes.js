const express=require('express');""
const {getFilteredProducts, getProductDetails, getStarProducts} = require("../controllers/shop/products-controller")
const router=express.Router();


router.get('/get',getFilteredProducts);
router.get('/get/:id',getProductDetails);
router.get('/star',getStarProducts)

module.exports=router
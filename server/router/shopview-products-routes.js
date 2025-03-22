const express=require('express');
const {getFilteredProducts, getProductDetails, getStarProducts,updateProductStock} = require("../controllers/shop/products-controller");
const router=express.Router();


router.get('/get',getFilteredProducts);
router.get('/get/:id',getProductDetails);
router.get('/star',getStarProducts);
router.post('/update',updateProductStock);

module.exports=router
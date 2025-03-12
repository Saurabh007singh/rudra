const express=require("express")

const {addToCart,
  updateCartItemQuantity,
  deleteCart,
  fetchCartItems,}=require("../controllers/shop/cartcontroller")

  const router=express.Router();

  router.post('/add',addToCart);
  router.get('/get/:userId',fetchCartItems);
  router.put('/update-cart',updateCartItemQuantity);
  router.delete('/:userId/:productId',deleteCart)

  module.exports=router;


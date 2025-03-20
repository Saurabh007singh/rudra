const express=require("express")

const {addToCart,
  updateCartItemQuantity,
  deleteCartItems,
  fetchCartItems,deleteCart}=require("../controllers/shop/cartcontroller")

  const router=express.Router();

  router.post('/add',addToCart);
  router.get('/get/:userId',fetchCartItems);
  router.put('/update-cart',updateCartItemQuantity);
  router.delete('/:userId/:productId',deleteCartItems)
  router.delete('/:userId',deleteCart)

  module.exports=router;


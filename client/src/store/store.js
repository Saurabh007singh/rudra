import{ configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductSlice from "../store/admin/product-slice/index"
import shopProductSlice from "../store/shop/product-slice/index"
import shopCartSlice from "../store/shop/cart-slice/cart-slice"
import shopAddressSlice from "../store/shop/address-slice/index"
import imageSlice from "../store/imageslice"
import whishListSlice from "../store/shop/whish-list-slice"
import orderSlice from "../store/shop/order-slice"
import reviewSlice from "../store/shop/review-slice"
import locationSlice from "../store/shop/location-slice"

const store=configureStore({
  reducer:{
    auth:authReducer,
    adminProducts:adminProductSlice,
    shopProducts:shopProductSlice,
    shopCart:shopCartSlice,
    address:shopAddressSlice,
    images:imageSlice,
    whish:whishListSlice,
    orders:orderSlice,
    reviews:reviewSlice,
    location:locationSlice
  }
})

export default store
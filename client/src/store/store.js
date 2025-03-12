import{ configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductSlice from "../store/admin/product-slice/index"
import shopProductSlice from "../store/shop/product-slice/index"
import shopCartSlice from "../store/shop/cart-slice/cart-slice"
import shopAddressSlice from "../store/shop/address-slice/index"
import imageSlice from "../store/imageslice"

const store=configureStore({
  reducer:{
    auth:authReducer,
    adminProducts:adminProductSlice,
    shopProducts:shopProductSlice,
    shopCart:shopCartSlice,
    address:shopAddressSlice,
    images:imageSlice
  }
})

export default store
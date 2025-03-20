import axios from "axios"

import { createSlice, createAsyncThunk }from "@reduxjs/toolkit"

const initialState={
  isOrdersLoading:false,
  allOrders:[]
}
export const createOrder=createAsyncThunk("/orders/createOrder",async(orderData)=>{
const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/create`,orderData)
return response.data
})

const orderSlice=createSlice({
  name:"orders",
  initialState,
  reducres:{},
  extraReducers:(builder)=>{
    builder.addCase(createOrder.pending,(state)=>{
      state.isOrderLoading=true;
    }).addCase(createOrder.fulfilled,(state,action)=>{
      state.isOrdersLoading=false;
      state.allOrders=action.payload.data
    }).addCase(createOrder.rejected,(state)=>{
      state.isOrderLoading=false
    })
  }

})

export default orderSlice.reducer
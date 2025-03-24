import axios from "axios"

import { createSlice, createAsyncThunk }from "@reduxjs/toolkit"

const initialState={
  isOrdersLoading:false,
  allOrders:[],
  createdOrder:[]
}
export const createOrder=createAsyncThunk("/orders/createOrder",async(orderData)=>{
const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/create`,orderData)
return response.data
})

export const getAllOrders=createAsyncThunk("/orders/getAllOrders",async(userId)=>{
  const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/get/${userId}`)
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
      state.createdOrder=action.payload.data
    }).addCase(createOrder.rejected,(state)=>{
      state.isOrderLoading=false
    }).addCase(getAllOrders.pending,(state)=>{
      state.isOrderLoading=true;
    }).addCase(getAllOrders.fulfilled,(state,action)=>{
      state.isOrdersLoading=false;
      state.allOrders=action.payload.data
    }).addCase(getAllOrders.rejected,(state)=>{
      state.isOrderLoading=false
    })
  }

})

export default orderSlice.reducer
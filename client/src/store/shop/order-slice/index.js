import axios from "axios"

import { createSlice, createAsyncThunk }from "@reduxjs/toolkit"

const initialState={
  isUSerOrdersLoading:false,
  isSingleOrderLoading:false,
  isOrdersLoading:false,
  allOrders:[],
  singleOrder:[],
  userOrders:[],
}
export const createOrder=createAsyncThunk("/orders/createOrder",async(orderData)=>{
const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/create`,orderData)
return response.data
})

export const getAllOrders=createAsyncThunk("/orders/getAllOrders",async(userId)=>{
  const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/get/${userId}`)
  return response.data
})

export const getSingleOrders=createAsyncThunk("/orders/getSingleOrder",async(orderId)=>{
  const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/get/single/${orderId}`)
  return response.data
})
export const updateStatus=createAsyncThunk("/orders/updataStatus",async({orderId,formData})=>{
  const response=await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/update/${orderId}`,{formData})
  return response.data
})

export const getUserOrders=createAsyncThunk("/orders/getUserOrders",async(userId)=>{
const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/get/user/${userId}`)
return response.data
})


const orderSlice=createSlice({
  name:"orders",
  initialState,
  reducers:{
    
  },
  extraReducers:(builder)=>{
    builder.addCase(createOrder.pending,(state)=>{
      state.isOrdersLoading=true;
    }).addCase(createOrder.fulfilled,(state,action)=>{
      state.isOrdersLoading=false;
    }).addCase(createOrder.rejected,(state)=>{
      state.isOrdersLoading=false
    }).addCase(getAllOrders.pending,(state)=>{
      state.isOrdersLoading=true;
    }).addCase(getAllOrders.fulfilled,(state,action)=>{
      state.isOrdersLoading=false;
      state.allOrders=action.payload.data
    }).addCase(getAllOrders.rejected,(state)=>{
      state.isOrdersLoading=false
    }).addCase(getSingleOrders.pending,(state)=>{
      state.isSingleOrderLoading=true;
    }).addCase(getSingleOrders.fulfilled,(state,action)=>{
      state.isSingleOrderLoading=false;
      state.singleOrder=action.payload.data
    }).addCase(getSingleOrders.rejected,(state)=>{
      state.isSingleOrderLoading=false
    }).addCase(updateStatus.pending,(state)=>{
      state.isSingleOrderLoading=true;
    }).addCase(updateStatus.fulfilled,(state,action)=>{
      state.isSingleOrderLoading=false;
    }).addCase(updateStatus.rejected,(state)=>{
      state.isSingleOrderLoading=false
    }).addCase(getUserOrders.pending,(state)=>{
      state.isUSerOrdersLoading=true;
    }).addCase(getUserOrders.fulfilled,(state,action)=>{
      state.isUSerOrdersLoading=false;
      state.userOrders=action.payload.data
    }).addCase(getUserOrders.rejected,(state)=>{
      state.isUSerOrdersLoading=false
    })
  }

})

export default orderSlice.reducer
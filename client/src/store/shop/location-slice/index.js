import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
  isLoading:false
}

export const saveLocation=createAsyncThunk("/shop/saveLocation",async(locationData)=>{
  console.log(locationData)
const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/location`,{locationData})
console.log(response.data)
return response.data;
})

const locationSlice=createSlice({
name:"location",
initialState,
reducers:{},
extraReducers:(builder=>{
  builder.addCase(saveLocation.pending,(state)=>{
    state.isLoading=true;
  }).addCase(saveLocation.fulfilled,(state)=>{
    state.isLoading=false;
  }).addCase(saveLocation.rejected,(state)=>{
    state.isLoading=false;
  })
})
})

export default locationSlice.reducer

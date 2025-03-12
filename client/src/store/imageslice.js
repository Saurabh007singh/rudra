import { createSlice, createAsyncThunk } from"@reduxjs/toolkit"
import axios from "axios";


const initialState={
  isLoading:false,
  images:[]
}

export const getImages=createAsyncThunk("/images/getImages",async(id)=>{
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/images/${id}`);
  return response.data
})

const imageSlice=createSlice({
  name:"images",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getImages.pending,(state)=>{
      state.isLoading=true;
    }).addCase(getImages.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.images=action.payload.data
    }).addCase(getImages.rejected,(state)=>{
      state.isLoading=false;
      state.images=[];
    })

  }
})

export default imageSlice.reducer
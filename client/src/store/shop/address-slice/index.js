import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/address/add",
      formData
    );
    return response.data;
   
  }
);

export const getAllAddress= createAsyncThunk(
  "/address/getAllAddress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/address/get/${userId}`
    );
    return response.data;

  }
);

export const editAddress= createAsyncThunk(
  "/address/editAddress",
  async ({userId,addressId,formData}) => {
    const response = await axios.put(
      `http://localhost:5000/api/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

export const deleteAddress= createAsyncThunk(
  "/address/deleteAddress",
  async ({userId,addressId}) => {
    const response = await axios.delete(
      `http://localhost:5000/api/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);



const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewAddress.pending,(state)=>{
      state.isLoading=true;
    }).addCase(addNewAddress.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.addressList=action.payload.data;
    }).addCase(addNewAddress.rejected,(state)=>{
      state.isLoading=false;
      state.addressList=[];
    }).addCase(editAddress.pending,(state)=>{
      state.isLoading=true;
    }).addCase(editAddress.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.addressList=action.payload.data;
    }).addCase(editAddress.rejected,(state)=>{
      state.isLoading=false;
      state.addressList=[];
    }).addCase(deleteAddress.pending,(state)=>{
      state.isLoading=true;
    }).addCase(deleteAddress.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.addressList=action.payload.data;
    }).addCase(deleteAddress.rejected,(state)=>{
      state.isLoading=false;
      state.addressList=[];
    }).addCase(getAllAddress.pending,(state)=>{
      state.isLoading=true;
    }).addCase(getAllAddress.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.addressList=action.payload.data;
    }).addCase(getAllAddress.rejected,(state)=>{
      state.isLoading=false;
      state.addressList=[];
    })
  },
});

export default addressSlice.reducer;

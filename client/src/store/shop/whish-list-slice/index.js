import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isWishLoading: false,
  whishList: [],
};

export const addToWhishList = createAsyncThunk(
  "/whish/addToWhishList",
  async ({ userId, productId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/whish/add`,
      { userId, productId }
    );
    return response.data;
  }
);

export const fetchWhishList = createAsyncThunk(
  "/whish/fetchWhishList",
  async ({ userId }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/whish/get/${userId}`
    );
    return response.data;
  }
);

export const deleteFromWhishList = createAsyncThunk(
  "/whish/deleteFromWhishList",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/whish/delete/${userId}/${productId}`
    );
    return response.data;
  }
);

const whishListSlice = createSlice({
  name: "whish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWhishList.pending, (state) => {
        state.isWishLoading = true;
      })
      .addCase(addToWhishList.fulfilled, (state, action) => {
        state.isWishLoading = false;
        state.whishList = action.payload.data.productId;
      })
      .addCase(addToWhishList.rejected, (state) => {
        state.isWishLoading = false;
      })
      .addCase(fetchWhishList.pending, (state) => {
        state.isWishLoading = true;
      })
      .addCase(fetchWhishList.fulfilled, (state, action) => {
        state.isWishLoading = false;
        if (action.payload.data) {
          state.whishList = action.payload.data.productId;
        }
      })
      .addCase(fetchWhishList.rejected, (state) => {
        state.isWishLoading = false;
      })
      .addCase(deleteFromWhishList.pending, (state) => {
        state.isWishLoading = true;
      })
      .addCase(deleteFromWhishList.fulfilled, (state, action) => {
        state.isWishLoading = false;
        state.whishList = action.payload.data.productId;
      })
      .addCase(deleteFromWhishList.rejected, (state) => {
        state.isWishLoading = false; 
      });
  },
});

export default whishListSlice.reducer;

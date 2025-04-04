import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isReviewLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/review/addReview",
  async ({productId,userId,rating,reviewText}) => {
    
    const response =await axios.post(
      `${import.meta.env.VITE_API_URL}/api/review/add`,
      {productId,userId,rating,reviewText}
    );
   
    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "/review/getReviews",
  async (productId) => {
    const response =await axios.get(
      `${import.meta.env.VITE_API_URL}/api/review/get/${productId}`
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isReviewLoading = false;
      })
      .addCase(addReview.rejected, (state) => {
        state.isReviewLoading = false;
      }).addCase(getReviews.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isReviewLoading = false;
        state.reviews=[]
      });;
  },
});

export default reviewSlice.reducer;

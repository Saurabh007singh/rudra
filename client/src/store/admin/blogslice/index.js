import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isblogLoading: true,
  singleBlog: [],
  allBlogs: [],
};


export const addBlog = createAsyncThunk("/blog/addblog", async (formData) => {
  c
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/admin/blog/add`,
    formData,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
 
  return response.data;
});


export const fetchAllBlogs = createAsyncThunk(
  "/blog/fetchAllBlogs",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/blog/get`
    );
    return response.data;
  }
);

export const deleteBlogs = createAsyncThunk(
  "/blog/deleteBlogs",
  async ({ id }) => {
   
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/blog/delete/${id}`
    );
    return response.data;
  }
);


export const getBlog = createAsyncThunk("/blog/getBlog", async ({ id }) => {

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/admin/blog/get/${id}`
  );
  return response.data;
});


export const editBlog = createAsyncThunk("/blog/editBlog", async ({ id, formData }) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/admin/blog/edit/${id}`,
    formData,  // sending formData as body
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.data;
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling addBlog async actions
      .addCase(addBlog.pending, (state) => {
        state.isblogLoading = true;
      })
      .addCase(addBlog.fulfilled, (state) => {
        state.isblogLoading = false;
      })
      .addCase(addBlog.rejected, (state) => {
        state.isblogLoading = false;
      })
      
      // Handling fetchAllBlogs async actions
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isblogLoading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload.data;
        state.isblogLoading = false;
      })
      .addCase(fetchAllBlogs.rejected, (state) => {
        state.isblogLoading = false;
      })
      
      // Handling deleteBlogs async actions
      .addCase(deleteBlogs.pending, (state) => {
        state.isblogLoading = true;
      })
      .addCase(deleteBlogs.fulfilled, (state, action) => {
        // Remove the deleted blog from the allBlogs array
        state.allBlogs = state.allBlogs.filter(blog => blog._id !== action.payload._id);
        state.isblogLoading = false;
      })
      .addCase(deleteBlogs.rejected, (state) => {
        state.isblogLoading = false;
      })
      
      // Handling getBlog async actions (combined the pending, fulfilled, and rejected in one addCase)
      .addCase(getBlog.pending, (state) => {
        state.isblogLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isblogLoading = false;
        state.singleBlog = action.payload.data;
      })
      .addCase(getBlog.rejected, (state) => {
        state.isblogLoading = false;
      })
      
      // Handling editBlog async actions
      .addCase(editBlog.pending, (state) => {
        state.isblogLoading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isblogLoading = false;
        // Update the specific blog in the allBlogs array
        const updatedBlogIndex = state.allBlogs.findIndex(blog => blog._id === action.payload.data._id);
        if (updatedBlogIndex !== -1) {
          state.allBlogs[updatedBlogIndex] = action.payload.data;
        }
        
        if (state.singleBlog._id === action.payload.data._id) {
          state.singleBlog = action.payload.data;
        }
      })
      .addCase(editBlog.rejected, (state) => {
        state.isblogLoading = false;
      });
  },
});

export default blogSlice.reducer;

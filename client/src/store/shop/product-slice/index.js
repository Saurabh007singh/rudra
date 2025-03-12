import axios from "axios";
import { createSlice, createAsyncThunk}  from "@reduxjs/toolkit"


const initialState={
  isLoading:true,
  isFetchProductsLoading:true,
  productList:[],
  productDetails:null,
  starProducts:null
}


export const fetchAllShopProducts = createAsyncThunk("/products/fetchAllShopProducts" ,
  async({sortParams}) => {
    const query=new URLSearchParams({
      sortBy:sortParams
    })
  const result=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/?${query}`);
  return result.data;

}

)


export const fetchProductDetails = createAsyncThunk("/products/fetchProductDetails",
  async({id}) => {
    
  const result=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`);
  return result.data;

}

)


const ShopProductSlice=createSlice({
name:"shopProducts",
initialState,
reducers:{
  clearProductDetails: (state) => {
    state.productDetails = null; // Clear old product details
  },
},
extraReducers:(builder)=>{
builder.addCase(fetchAllShopProducts.pending,(state)=>{
  state.isLoading=true;
}).addCase(fetchAllShopProducts.fulfilled,(state,action)=>{
  state.isLoading=false;
  state.productList=action.payload.data;
}).addCase(fetchAllShopProducts.rejected,(state)=>{
  state.isLoading=false;
  state.productList=[]
}).addCase(fetchProductDetails.pending,(state)=>{
  state.isFetchProductsLoading=true;
}).addCase(fetchProductDetails.fulfilled,(state,action)=>{
  state.isFetchProductsLoading=false;
  state.productDetails=action.payload.data;
}).addCase(fetchProductDetails.rejected,(state)=>{
  state.isFetchProductsLoading=false;
  state.productDetails=[]
})
}
})

export default ShopProductSlice.reducer;
export const {clearProductDetails}=ShopProductSlice.actions;
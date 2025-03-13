import { Outlet } from "react-router-dom";
import { ShoppingHeader } from "./shopping-header";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { Footer } from "./shopping-footer";

export const ShoppingLayout = () => {
  const dispatch = useDispatch();

  const { user,isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllProducts());
    if(isAuthenticated && user?.id){dispatch(fetchCartItems({ userId: user?.id }));}
    
  },[dispatch,isAuthenticated]);

  return (
    <div className=" relative flex flex-col h-full ">
      <div className="h-14 "></div>
      <div className="fixed z-40 w-full">
        <ShoppingHeader></ShoppingHeader>
      </div>
      <div>
        <main className="flex flex-col w-full ">
          <Outlet />
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

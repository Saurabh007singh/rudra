import { Outlet } from "react-router-dom";
import { ShoppingHeader } from "./shopping-header";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { Footer } from "./shopping-footer";
import { fetchWhishList } from "@/store/shop/whish-list-slice";
import { FaPhone, FaWhatsapp, FaWindows } from "react-icons/fa";
import { getAllAddress } from "@/store/shop/address-slice";

export const ShoppingLayout = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
 
  useEffect(() => {
    dispatch(fetchAllProducts({page:1,limit:1000}));
    if (isAuthenticated && user?.id) {
      dispatch(fetchCartItems({ userId: user?.id }));
      dispatch(fetchWhishList({ userId: user?.id }));
      dispatch(getAllAddress(user.id));
    }
  }, [dispatch, isAuthenticated]);

  

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

      <div className="fixed w-full z-50 bottom-0 ">
  <div className="flex gap-5 w-full lg:justify-end md:justify-end justify-center bg-[#786B4A] p-2 lg:bg-transparent">
    <div className="flex w-[50%] lg:hidden">
      <a
        href="https://wa.me/+919810300847"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-600 transition-transform transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>

    <div className="flex">
      <a
        href="tel:+919810300847"
        className="text-blue-500 lg:hidden md:hidden xl:hidden 2xl:hidden hover:text-blue-600 transition-transform transform hover:scale-110"
        aria-label="Call us"
      >
        <FaPhone size={30} className="transform scale-x-[-1]" />
      </a>
    </div>
  </div>
</div>

    </div>
  );
};

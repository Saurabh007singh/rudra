import { useDispatch, useSelector } from "react-redux";
import { UserCartItemsContent } from "@/components/shopping/usercartcontent";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  HandCoins,
  Mail,
  MapPin,
  Phone,
  Tag,
  Truck,
  Wallet,
} from "lucide-react";
import { getAllAddress } from "@/store/shop/address-slice";
import { Loading } from "../loading/loading";

export const ShoppingCheckout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { cartItems, isLoading } = useSelector((state) => state.shopCart);

  const { addressList } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
    dispatch(getAllAddress(user?.id));
  }, [dispatch]);

  const address = addressList[0];
  console.log(address);

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem.quantity,
          0
        )
      : 0;

  const totalPrice =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.price > 0 ? currentItem.price : 0) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <>
      {!isLoading ? (
        <>
          {totalCartAmount !== 0 ? (
            <>
              <div className="  flex flex-col w-full lg:w-[50%] h-full lg:mx-auto items-center   border">
                <div className=" sticky flex px-4 w-full flex-row justify-between items-center h-14 bg-[#FFFFFF]">
                  <div>
                    <img src="/images/rudra.png" alt="" className="h-8" />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Order Total</span>
                    <div className="flex items-center gap-1 flex-row">
                      <span className="line-through text-[12px] text-slate-500 font-semibold">
                        ₹{totalPrice}
                      </span>
                      <span className="font-semibold text-[22px]">
                        ₹{totalCartAmount}
                      </span>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
                <div className="h-7 bg-[#786B4A] w-full text-center">
                  <span className="text-white text-center p-4 font-arial">
                    Roodra Rewards - ₹1 for every ₹100 spent(Prepaid orders only
                    )
                  </span>
                </div>
                <div className="flex flex-col w-[95%] bg-slate-50 rounded-sm m-2 shadow-lg p-1 gap-2">
                  <div className="flex justify-between flex-row ">
                    <div className="flex flex-row gap-1">
                      <MapPin />
                      <span className="font-semibold ">Deliver to</span>
                      <div className=" bg-[#e3dfd5] rounded-xl">
                        <span className="font-semibold p-2">Home</span>
                      </div>
                    </div>
                    <div onClick={()=>{navigate("/shop/account")}} className="flex flex-row hover:scale-110 cursor-pointer transition duration-300">
                      <span className="font-semibold">Edit</span>
                      <ChevronRight />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mx-2 p-2 mb-2 bg-white shadow-xl rounded-lg">
                    <span>{address.address}</span>
                    <div className="flex flex-row gap-1">
                      <span>{address.city}</span>,<span>{address.state}</span>,
                      <span className="font-semibold">{address.pincode}</span>
                    </div>
                    <div className="flex felx-row gap-2">
                      <Phone className="h-5" />
                      <span>{address.phone}</span>
                      <Mail className="h-5" />
                      <span>{user.email}</span>
                    </div>
                    <div className="bg-[#d3cebf] flex flex-row gap-2 p-1 rounded-lg">
                      <Truck />
                      <span> Delivery in 7 to 8 working days</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 bg-white shadow-xl rounded-lg">
                    <FileText />
                    <span className="font-semibold">
                      Billing and GSTIN (OPTIONAL)
                    </span>
                  </div>

                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg">
                    <div className="flex gap-1 flex-row">
                      <Truck />
                      <span className="font-semibold">Shipping</span>
                    </div>
                    <span className="font-bold text-green-400">
                      FREE(above ₹499)
                    </span>
                  </div>

                  <div className="gap-2 mx-2 p-2 mb-2 justify-between">
                    <span className=" font-semibold font-arial text-[20px]">
                      Offers & Rewards
                    </span>
                  </div>
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between items-center bg-white shadow-xl rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row gap-2 items-center">
                        <Tag className="text-green-400" />
                        <span className="font-semibold text-[20px] text-green-400">
                          Save ₹20
                        </span>
                      </div>
                      <span className="text-[14px]"> with "MAKEHAWANSPECIAL"</span>
                    </div>
                    <span className=" border border-green-400 p-2 rounded-lg font-semibold text-green-400 ">APPLY</span>
                    
                  </div>
                  <div className="gap-2 mx-2 p-2 mb-2 justify-between">
                  <span className="font-semibold font-arial text-[20px]">
                      Payment methods
                    </span>
                  </div>
                  <div onClick={()=>navigate("/pay1")} className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg hover:scale-110 transition duration-300 cursor-pointer">
                    <div  className="flex gap-1 flex-row ">
                      <img src="/images/upi-icon.svg" alt="" className="h-7" />
                      <span className="font-semibold"> PAY VIA UPI</span>
                    </div>
                    <span className="font-semibold text-[20px] ">
                    {totalCartAmount>=499? `₹${totalCartAmount}` : `₹ ${totalCartAmount} + ₹90`}
                    </span>
                  </div>
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg hover:scale-110 cursor-pointer transition duration-300">
                    <div className="flex gap-1 flex-row">
                      <img src="/images/paypal-icon.svg" alt="" className="h-7" />
                      <span className="font-semibold"> PAY VIA PAYPAL</span>
                    </div>
                    <span className="font-semibold text-[20px] ">
                    {totalCartAmount>=499? `₹${totalCartAmount}` : `₹ ${totalCartAmount} + ₹90`}
                    </span>
                  </div>
                 
                  <div onClick={()=>{navigate("/pay2")}} className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg hover:scale-110 cursor-pointer transition duration-300">
                    <div className="flex gap-1 flex-row">
                    <Wallet />
                      <span className="font-semibold">PAY ON DELIVERY</span>
                    </div>
                    <span className="font-semibold text-[20px] ">
                      {totalCartAmount>=499? `₹${totalCartAmount}` : `₹ ${totalCartAmount} + ₹90`}
                    
                    </span>
                  </div>
                </div>
              </div>

            
            </>
          ) : (
            <div className="bg-gray-100 flex items-center justify-center h-screen">
              <div className="bg-white p-12 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="text-6xl text-orange-500 mb-4">🛒</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Your Cart is Empty
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  It looks like you haven't added anything to your cart yet.
                  Let's change that!
                </p>
                <button
                  className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onClick={() => (window.location.href = "/shop/home")} // Change '/shop' to the actual page where users can shop
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

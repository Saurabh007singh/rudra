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
              <div className="flex flex-col w-full lg:w-[60%] mx-auto border">
                <div className="sticky flex px-4 w-full flex-row justify-between items-center h-14 bg-[#FFFFFF]">
                  <div>
                    <img src="/images/rudra.png" alt="" className="h-8" />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg md:text-xl">Order Total</span>
                    <div className="flex items-center gap-1 flex-row">
                      <span className="line-through text-sm md:text-base text-slate-500 font-semibold">
                        ₹{totalPrice}
                      </span>
                      <span className="font-semibold text-lg md:text-2xl">
                        ₹{totalCartAmount}
                      </span>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
                <div className="h-7 bg-[#786B4A] w-full text-center">
                  <span className="text-white text-xs md:text-sm p-2">
                    Roodra Rewards - ₹1 for every ₹100 spent (Prepaid orders only)
                  </span>
                </div>

                <div className="flex flex-col w-[95%] bg-slate-50 rounded-sm m-2 shadow-lg p-3 gap-3">
                  {/* Deliver To Section */}
                  <div className="flex justify-between flex-row">
                    <div className="flex flex-row gap-1">
                      <MapPin />
                      <span className="font-semibold text-sm md:text-base">Deliver to</span>
                      <div className="bg-[#e3dfd5] rounded-xl">
                        <span className="font-semibold text-sm md:text-base p-2">Home</span>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        navigate("/shop/account");
                      }}
                      className="flex flex-row hover:scale-110 cursor-pointer transition duration-300"
                    >
                      <span className="font-semibold text-sm md:text-base">Edit</span>
                      <ChevronRight />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mx-2 p-2 mb-2 bg-white shadow-xl rounded-lg">
                    <span className="text-sm md:text-base">{address.address}</span>
                    <div className="flex flex-row gap-1">
                      <span className="text-sm md:text-base">{address.city}</span>,{" "}
                      <span className="text-sm md:text-base">{address.state}</span>,{" "}
                      <span className="font-semibold text-sm md:text-base">
                        {address.pincode}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Phone className="h-5" />
                      <span className="text-sm md:text-base">{address.phone}</span>
                      <Mail className="h-5" />
                      <span className="text-sm md:text-base">{user.email}</span>
                    </div>
                    <div className="bg-[#d3cebf] flex flex-row gap-2 p-1 rounded-lg">
                      <Truck />
                      <span className="text-sm md:text-base">
                        Delivery in 7 to 8 working days
                      </span>
                    </div>
                  </div>

                  {/* Billing and GSTIN Section */}
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg">
                    <div className="flex gap-1 flex-row">
                      <FileText />
                      <span className="font-semibold text-sm md:text-base">
                        Billing and GSTIN (OPTIONAL)
                      </span>
                    </div>
                  </div>

                  {/* Shipping Section */}
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg">
                    <div className="flex gap-1 flex-row">
                      <Truck />
                      <span className="font-semibold text-sm md:text-base">Shipping</span>
                    </div>
                    <span className="font-bold text-green-400 text-sm md:text-base">
                      FREE (above ₹499)
                    </span>
                  </div>

                  {/* Offers Section */}
                  <div className="gap-2 mx-2 p-2 mb-2 justify-between">
                    <span className="font-semibold text-lg md:text-xl">Offers & Rewards</span>
                  </div>
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between items-center bg-white shadow-xl rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row gap-2 items-center">
                        <Tag className="text-green-400" />
                        <span className="font-semibold text-lg md:text-xl text-green-400">
                          Save ₹20
                        </span>
                      </div>
                      <span className="text-sm md:text-base">with "MAKEHAWANSPECIAL"</span>
                    </div>
                    <span className="border border-green-400 p-2 rounded-lg font-semibold text-green-400 text-sm md:text-base">
                      APPLY
                    </span>
                  </div>

                  {/* Payment Methods Section */}
                  <div className="gap-2 mx-2 p-2 mb-2 justify-between">
                    <span className="font-semibold text-lg md:text-xl">Payment methods</span>
                  </div>

                  {/* UPI Payment */}
                  <div
                    onClick={() => navigate("/pay1")}
                    className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg hover:scale-110 transition duration-300 cursor-pointer"
                  >
                    <div className="flex gap-1 flex-row">
                      <img src="/images/upi-icon.svg" alt="" className="h-7" />
                      <span className="font-semibold text-sm md:text-base"> PAY VIA UPI</span>
                    </div>
                    <span className="font-semibold text-lg md:text-xl">
                      {totalCartAmount >= 499
                        ? `₹${totalCartAmount}`
                        : `₹ ${totalCartAmount} + ₹90`}
                    </span>
                  </div>

                  {/* PayPal Payment */}
                  <div className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg hover:scale-110 cursor-pointer transition duration-300">
                    <div className="flex gap-1 flex-row">
                      <img src="/images/paypal-icon.svg" alt="" className="h-7" />
                     
                    </div>
                    <span className="font-semibold text-lg md:text-xl">
                      {totalCartAmount >= 499
                        ? `₹${totalCartAmount}`
                        : `₹ ${totalCartAmount} + ₹90`}
                    </span>
                  </div>

                  {/* Pay On Delivery */}
                  <div
                    onClick={() => {
                      navigate("/pay2");
                    }}
                    className="flex flex-row gap-2 mx-2 p-2 mb-2 justify-between bg-white shadow-xl rounded-lg hover:scale-110 cursor-pointer transition duration-300"
                  >
                    <div className="flex gap-1 flex-row">
                      <Wallet />
                      <span className="font-semibold text-sm md:text-base">PAY ON DELIVERY</span>
                    </div>
                    <span className="font-semibold text-lg md:text-xl">
                      {totalCartAmount >= 499
                        ? `₹${totalCartAmount}`
                        : `₹ ${totalCartAmount} + ₹90`}
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
                  onClick={() => (window.location.href = "/shop/home")}
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

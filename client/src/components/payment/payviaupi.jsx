import { getAllAddress } from "@/store/shop/address-slice";
import { deleteCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { createOrder } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PayUpi() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
      dispatch(fetchCartItems({ userId: user?.id }));
      dispatch(getAllAddress(user?.id));
    }, [dispatch]);

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

  const ordersData = {
    userId: user.id,
    cartItems: cartItems,
    address: addressList[0],
    totalAmount: totalCartAmount,
    orderDate: new Date(),
    paymentMethod: "UPI",
  };

  function handlePayment() {
    dispatch(createOrder(ordersData))
      .then(() => {
        dispatch(deleteCart({ userId: user?.id }));
      })
      .then(() => {
        navigate("/confirmation");
      });
  }

  return (
    <>
      {totalCartAmount !== 0 ? (
        <div className=" flex justify-center w-full "><div className="flex w-[80%] justify-center  items-center  ">
          <div className="h-[600px] w-[500px]  border my-5 flex items-center flex-col gap-2 ">
            <span className="mt-2 text-2xl text-[#5E7BA5] ">
              PAY VIA UPI QR
            </span>
            <span>Your Total</span>
            <span>₹{totalCartAmount}</span>
            <div className="w-[400px] h-[400px] bg-red-300 p-3">df</div>
            <span>
              1.Pay The amount here on this Qr Code <br />
              2.After Successful Payment Click on the button below
              <br />
              3.And send a screeshot on our Whats app +919999999999
              <br />
              4.Once Confirmed We will proceed to ship your order
            </span>
            <div className="flex w-full flex-row">
              <button
                onClick={handlePayment}
                className="text-md w-full h-12 bg-[#786B4A] text-white"
              >
                Payment Done
              </button>
            </div>
          </div>
        </div></div>
        
      ) : (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
          <div className="bg-white p-12 rounded-lg shadow-lg text-center max-w-md w-full">
            <div className="text-6xl text-orange-500 mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              It looks like you haven't added anything to your cart yet. Let's
              change that!
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
  );
}

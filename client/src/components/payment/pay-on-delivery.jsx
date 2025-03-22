import { getAllAddress } from "@/store/shop/address-slice";
import {
  deleteCart,
  fetchCartItems,
} from "@/store/shop/cart-slice/cart-slice";
import { createOrder } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendMail } from "../mail/mailer";
import { updateStockQuantity } from "@/store/shop/product-slice";

export function PayDelivery() {
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const email=user.email
  
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log(cartItems);

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
    paymentMethod: "PAYONDELIVERY",
  };

  function handlePayment() {
    dispatch(createOrder(ordersData))
      .then((data) => {
        if (data.payload.success === true) {
          dispatch(updateStockQuantity(cartItems)).then(data=>console.log(data))
          
          
          sendMail(email,data.payload.data,totalCartAmount);
        }
      }).then(() => {
        dispatch(deleteCart({ userId:user?.id }));
      })
      .then(() => {
        navigate("/confirmation");
      });
  }

  return (
    <>
      {totalCartAmount !== 0 ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
          <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl transform transition-all duration-700 ease-in-out animate__animated animate__fadeIn animate__delay-1s">
            <div className="text-center mb-6">
              <span className="text-3xl text-[#5E7BA5] font-semibold mb-2 block">
                Pay on Delivery
              </span>
              <span className="text-lg text-gray-600">Your Total</span>
              <div className="text-2xl font-semibold text-gray-800 mb-6">
                ₹{totalCartAmount}
              </div>
            </div>

            <div className="w-full mb-6">
              <div className="w-full bg-green-100 p-6 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-blue-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Pay on Delivery
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Choose to pay when your order arrives!
                </p>
                <button
                  onClick={handlePayment}
                  className="w-full py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-colors mb-4"
                >
                  Confirm Order
                </button>
              </div>
            </div>

            <span className="text-center block mb-6">
              We will deliver your order once confirmed
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
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
              className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
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

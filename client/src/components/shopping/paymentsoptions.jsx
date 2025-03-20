import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PaymentOptions() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate=useNavigate()

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

  return (
    <>
    {totalCartAmount !==0 ?<div className="flex w-full justify-center items-center ">
        <div className="h-[600px] w-[500px] border my-5 flex items-center flex-col gap-2">
          <span>Your Total</span><span className="font-bold text-2xl">₹{totalCartAmount}</span>
          <span className="mt-2 text-2xl text-[#5E7BA5] bg-slate-100 w-full text-center ">PAY VIA</span>
          <img onClick={()=>navigate("/pay1")} src="/images/upi-icon.svg" alt="upi" className="h-10"/>
          <img src="/images/paypal-icon.svg" alt="paypal" className="h-10"/>
        </div>
      </div>:<div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-12 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="text-6xl text-orange-500 mb-4">
                    🛒
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Your Cart is Empty
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    It looks like you haven't added anything to your cart yet. Let's change that!
                </p>
                <button 
                    className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => window.location.href = '/shop/home'} // Change '/shop' to the actual page where users can shop
                >
                    Start Shopping
                </button>
            </div>
        </div>}
      
    </>
  );
}

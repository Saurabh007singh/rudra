import { useSelector } from "react-redux";

export function PaymentOptions() {
  const { cartItems } = useSelector((state) => state.shopCart);

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
      <div className="flex w-full justify-center items-center ">
        <div className="h-[600px] w-[500px] border my-5 flex items-center flex-col gap-2">
          <span className="mt-2 text-2xl text-[#5E7BA5] ">PAY VIA UPI QR</span>
          <span>Your Total</span>
          <span>₹{totalCartAmount}</span>
          <div className="w-[400px] h-[400px] bg-red-300">df</div>
          <span>
            {" "}
            1.Pay The amount here on this Qr Code <br />
            2.And send a screeshot on our Whats app +919999999999
            <br />
            3.After Successful Payment Click on the button below<br />
            4.Once Confirmed We will proceed to ship your order
          </span>
          <div className="flex w-full flex-row">
            <button className="text-md w-full h-12 bg-[#786B4A] text-white">
              Payment Successfull
            </button>
            <button className="text-md w-full h-12 bg-red-600 text-white">
              Payment Failed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

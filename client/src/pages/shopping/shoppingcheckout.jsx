import { useSelector } from "react-redux"
import { Address } from "./address"
import { UserCartItemsContent } from "@/components/shopping/usercartcontent"
import { useNavigate } from "react-router-dom"


export const ShoppingCheckout=()=>{
  const navigate=useNavigate()

  
  const {cartItems}=useSelector((state) => state.shopCart)

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

  return(
    <div>
      {totalCartAmount !==0 ?<div className="felx flex-col">
    <div className="relative h-[400px]">
    <img src="/images/banner.avif" alt="banner image"  className="w-full h-full object-cover object-center"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5  ">
      <Address></Address>
      <div className="flex flex-col gap-4">
      {cartItems && cartItems.length > 0
          ? cartItems.map((items) =>(
              <UserCartItemsContent key={items.productId} cartItems={items} />
            ))
          : null}
          <div className="flex justify-between">
            <span className="font-bold text-2xl mt-2">Total</span>
            <span className="font-bold text-2xl mt-2">
              ₹{totalCartAmount}.00
            </span>
            
          </div>
          <button onClick={()=>navigate("/shop/pay")} className="text-md  h-12 bg-[#786B4A] text-white">Proceed To pay</button>
      </div>
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
      </div>
  )
}
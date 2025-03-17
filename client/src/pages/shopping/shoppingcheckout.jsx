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

  return(<div className="felx flex-col">
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
  </div>)
}
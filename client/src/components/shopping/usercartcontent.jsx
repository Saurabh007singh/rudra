import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, fetchCartItems, updateCartQuantity } from "@/store/shop/cart-slice/cart-slice"

export function UserCartItemsContent({cartItems}){
const dispatch=useDispatch()
const {user}=useSelector(state=>state.auth)


function handleCartItemDelete(getCartItem){
  dispatch(deleteCartItem({userId:user?.id,productId:getCartItem.productId})).then(()=>{
    dispatch(fetchCartItems({userId:user?.id}))
  })

}

function handleUpdateQuantity(cartItem,typeofAction){
dispatch(updateCartQuantity({
  userId:user?.id,productId:cartItem.productId,quantity:
  typeofAction==='plus' ? cartItem.quantity + 1 :cartItem.quantity - 1
})).then(data=>{
  if(data?.payload.success){
    dispatch(fetchCartItems({userId:user?.id}))
  }
})
}


if(cartItems.totalStock ==0){
  handleCartItemDelete(cartItems)
}


  return <div className="flex items-center space-x-4">
    <img src={cartItems?.image} alt={cartItems?.title} className='w-20 h-20 rounded object-cover' />
    <div className="flex-1">
      <h3 className="font-semibold">{cartItems.title}</h3>
      <div className="flex items-center mt-1 gap-2 ">
        <Button variant="outline" size="icon" onClick={()=>handleUpdateQuantity(cartItems,'minus')} disabled={cartItems.quantity === 1 } className="h-8 w-8 rounded-full text-[#9B7442] ">
          <Minus className="w-4 h-4"></Minus>
        </Button>
        <span className="font-semibold">{cartItems.quantity}</span>
        {cartItems.quantity < cartItems.totalStock ? <Button variant="outline" size="icon"  onClick={()=>handleUpdateQuantity(cartItems,'plus')} className="h-8 w-8 rounded-full text-[#9B7442]">
          <Plus className="w-4 h-4"></Plus>
        </Button>:<Button variant="outline" disabled size="icon" className="h-8 w-8 rounded-full text-[#9B7442]">
          <Plus className="w-4 h-4"></Plus>
        </Button> }
        
      </div>
    </div>
    <div className="flex flex-col items-end">
    <p className="font-semiBold">
    ₹{((cartItems?.salePrice>0 ? cartItems.salePrice:cartItems.price)*cartItems.quantity).toFixed(2)}
    </p>
    <Trash onClick={()=>handleCartItemDelete(cartItems)} className="cursor-pointer mt-1 text-[#9B7442]" size={20}></Trash>
    </div>
  </div>
}
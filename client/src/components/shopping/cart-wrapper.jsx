import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { UserCartItemsContent } from "./usercartcontent";

export function CartWrapper({ cartItems ,setOpenCartSheet}) {
  const navigate = useNavigate();

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
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>
          <SheetDescription></SheetDescription>Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => (
              <UserCartItemsContent key={items.productId} cartItems={items} />
            ))
          : null}
      </div>
      {totalCartAmount <= 0 ? (
        <div>Nothing in your cart continue shopping</div>
      ) : (
        <div>
          <div className="flex justify-between">
            <span className="font-bold text-2xl mt-2">Total</span>
            <span className="font-bold text-2xl mt-2">
              ₹{totalCartAmount}.00
            </span>
          </div>
          <button
            onClick={() => {navigate("/shop/checkout");
              setOpenCartSheet(false)
            }}
            className="w-full mt-6 text-md h-12 bg-[#786B4A] text-white "
          >
            CheckOut
          </button>
        </div>
      )}
    </SheetContent>
  );
}

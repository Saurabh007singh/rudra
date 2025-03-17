import { LogOutIcon, Search, ShoppingCart, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/store/auth-slice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useState } from "react";
import { CartWrapper } from "./cart-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ShoppingProductTile } from "./shopping-product-tile";

function HeaderRight({ user, isAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  let filteredProducts = [];

  if (searchQuery !== "") {
    filteredProducts = productList.filter((products) =>
      products.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function getFiltredProducts(e) {
    setSearchQuery(e.target.value);
  }

  function handleLogout() {
    dispatch(logOutUser());
    navigate("/shop/home");
  }
  function handleGetProductsDetails(getCurrentProductId) {
    navigate(`/shop/product/${getCurrentProductId}`);
    setOpenSearch(false);
  }

  return (
    <div className="flex flex-row gap-3 justify-center items-center mt-2 ">
      <Dialog className="w-full" open={openSearch} onOpenChange={setOpenSearch}>
        <DialogTrigger>
          <Search className="text-[#9A713B] hover:scale-110 " />
        </DialogTrigger>
        <DialogContent className=" flex justify-center w-[100vw] max-w-[2000px] h-[100vh] overflow-auto ">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex  w-full flex-col gap-4 items-center">
            <div className="flex w-[90%] flex-row justify-between border-b">
              <input
                type="text"
                className=" w-full h-10 text-2xl focus:outline-none text-center "
                onChange={(e) => getFiltredProducts(e)}
                placeholder="Search for a product "
              />
              <Search className="bg-white h-10 w-8" />
            </div>

            <div className="grid lg:grid-cols-4 gap-1 grid-cols-2 mb-2 lg:gap-4  lg:mx-10  ">
              {isLoading ? (
                <>Loading</>
              ) : (
                filteredProducts.map((items) => (
                  <ShoppingProductTile
                    product={{ ...items }}
                    key={items._id}
                    handleGetProductsDetails={handleGetProductsDetails}
                  ></ShoppingProductTile>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isAuthenticated ? (
        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <ShoppingCart
            onClick={() => {
              setOpenCartSheet(true);
            }}
            className="text-[#9A713B] hover:scale-110 "
          />

          <CartWrapper
            cartItems={cartItems}
            setOpenCartSheet={setOpenCartSheet}
          ></CartWrapper>
        </Sheet>
      ) : (
        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <ShoppingCart
            onClick={() => {
              setOpenCartSheet(true);
            }}
            className="text-[#9A713B] hover:scale-110 "
          />

          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <SheetDescription></SheetDescription>Your Cart
              </SheetTitle>
            </SheetHeader>
            <span
              className="hover:text-[#9A713B] hover:underline cursor-pointer "
              onClick={() => navigate("/auth/login")}
            >
              Please Login to Continue...
            </span>
          </SheetContent>
        </Sheet>
      )}

      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="">
              <AvatarFallback className="text-1xl bg-[#3E506D] text-[white] font-bold cursor-pointer">
                {user.userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            className="w-52 h-28 mt-4 flex flex-col "
          >
            <DropdownMenuLabel>
              Logged In As {user.userName.toUpperCase()}
            </DropdownMenuLabel>

            <DropdownMenuSeparator>
              <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                <UserCog className=" h-4 w-4 " />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon className=" h-4 w-4" />
                <span>LogOut</span>
              </DropdownMenuItem>
            </DropdownMenuSeparator>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => navigate("/auth/login")}
          className="text-1xl bg-[#3E506D] text-[white] font-bold cursor-pointer"
        >
          Login
        </Button>
      )}
    </div>
  );
}

export const SidebarRight = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <HeaderRight user={user} isAuthenticated={isAuthenticated}></HeaderRight>
  );
};

import { LogOutIcon, ShoppingCart, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/store/auth-slice";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { useState } from "react";
import { CartWrapper } from "./cart-wrapper";


function HeaderRight({ user ,isAuthenticated}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [openCartSheet,setOpenCartSheet]=useState(false)
  const {cartItems}=useSelector((state) => state.shopCart)
  
  
  
  function handleLogout(){
    dispatch(logOutUser())
    navigate("/shop/home")
  }
  
    return (
      <div className="flex flex-row gap-3 justify-center items-center mt-2 ">
       { isAuthenticated?<Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
          <Button onClick={()=>{setOpenCartSheet(true);
          }} variant="outline" size="icon" >
          <ShoppingCart className="text-[#9A713B] "/>
          <span className="sr-only">UserCart</span>
        </Button>
        <CartWrapper cartItems={cartItems} setOpenCartSheet={setOpenCartSheet}></CartWrapper>
        
        </Sheet>:<Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
          <Button onClick={()=>{setOpenCartSheet(true);
          }} variant="outline" size="icon" >
          <ShoppingCart className="text-[#9A713B] "/>
          <span className="sr-only">UserCart</span>
        </Button>
        <SheetContent className="sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <SheetDescription></SheetDescription>Your Cart
                </SheetTitle>
              </SheetHeader>
              <span className="hover:text-[#9A713B] hover:underline cursor-pointer " onClick={()=>navigate("/auth/login")}>Please Login to Continue...</span>     
            </SheetContent>
        
        </Sheet>}
        
        
        {isAuthenticated ?
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            
              <Avatar className=""><AvatarFallback className="text-1xl bg-[#3E506D] text-[white] font-bold cursor-pointer">
              {user.userName.slice(0,2).toUpperCase()}
              </AvatarFallback></Avatar>
              
              
            
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            className="w-52 h-28 mt-4 flex flex-col "
          >
            <DropdownMenuLabel>Logged In As {user.userName.toUpperCase()}</DropdownMenuLabel>
            
            <DropdownMenuSeparator>
              <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
                <UserCog className=" h-4 w-4 "  />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon className=" h-4 w-4" />
                <span>LogOut</span>
              </DropdownMenuItem>
            </DropdownMenuSeparator>
          </DropdownMenuContent>
          
        </DropdownMenu>:<Button onClick={()=>navigate("/auth/login")} className="text-1xl bg-[#3E506D] text-[white] font-bold cursor-pointer">Login</Button>}
        
      </div>
    );
  }

export const SidebarRight =()=>{
  const { isAuthenticated, user } = useSelector((state) => state.auth);
 

  return<HeaderRight user={user} isAuthenticated={isAuthenticated}></HeaderRight>

}
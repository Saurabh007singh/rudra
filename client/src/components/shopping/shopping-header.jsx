import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { shoppingViewHeaderMenuItems } from "@/config/const ";

import { useState } from "react";

import { SidebarRight } from "./shopping-side-right.";
import { Separator } from "../ui/separator";

function MenuItems({ closeSheet }) {
  return (
    <div className="flex flex-col lg:flex-row lg:mt-2 lg:justify-center lg:items-center lg:gap-6 ">
      {shoppingViewHeaderMenuItems.map((items) => (
        <Link
          to={items.path}
          onClick={closeSheet}
          key={items.label}
          className="text-[14px] hover:text-[#9A713B] hover:underline "
        >
          {items.label}
        </Link>
      ))}
    </div>
  );
}

export function ShoppingHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();
  function closeSheet() {
    setIsSheetOpen(false);
  }

  return (
    <div>
      <header className="w-full bg-background">
        <div className="flex items-center justify-between px-4 md:px-6 w-full py-1 lg:hidden ">
          <div className="flex felx-row items-center justify-center gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger>
                <div className="lg:hidden">
                  <Menu onClick={() => setIsSheetOpen(true)} />
                </div>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader className="text-4xl font-bold border-b mb-4">
                  <img
                    className="h-12 w-44"
                    onClick={() => navigate("/shop/home")}
                    src="/images/rudra.png"
                    alt=""
                    // This will make the image itself rounded
                  />
                  <SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetTitle>
                </SheetHeader>
                <MenuItems closeSheet={closeSheet}></MenuItems>
              </SheetContent>
            </Sheet>
            <div className="w-32 mb-2">
              <img
                onClick={() => navigate("/shop/home")}
                src="/images/rudra.png"
                alt=""
                // This will make the image itself rounded
              />
            </div>
          </div>

          {/* <Link to="/shop/home" className="flex gap-2">
          <House className="lg:hidden" />
        </Link> */}

          <div className="flex flex-col justify-center items-center">
            <SidebarRight></SidebarRight>
          </div>
        </div>
        <div className="hidden lg:block p-1 mx-5  ">
          <div className="flex  items-center justify-between w-full ">
            <div>
              <img
                className="h-10 "
                onClick={() => navigate("/shop/home")}
                src="/images/rudra.png"
                alt=""
                // This will make the image itself rounded
              />
            </div>

            <MenuItems></MenuItems>
            <SidebarRight></SidebarRight>
          </div>
          
        </div> <Separator className="h-0.5"></Separator>
      </header>
     
    </div>
  );
}

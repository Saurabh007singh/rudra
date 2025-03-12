import { Fragment } from "react";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    lable: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "products",
    lable: "Products",
    path: "/admin/products",
    icon: <FaShoppingCart />,
  },
  {
    id: "orders",
    lable: "Orders",
    path: "/admin/orders",
    icon: <MdOutlineVerified />,
  },
];

function MenuItems({ navigate, setOpen }) {
  return (
    <nav className="mt-8 flex-col gap-2">
      {adminSidebarMenuItems.map((items) => (
        <div
          key={items.id}
          onClick={() => {
            navigate(items.path);
            setOpen(false);
          }}
          className="flex cursor-pointer  items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {items.icon}
          <span>{items.lable}</span>
        </div>
      ))}
    </nav>
  );
}

export const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader className="border-b">
            <SheetTitle>
              Admin Header
              <SheetDescription></SheetDescription>
            </SheetTitle>
          </SheetHeader>
          <MenuItems navigate={navigate} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <RiAdminFill className="text-2xl" />
          <h1 className="text-xl font-extrabold"> Admin Panel</h1>
        </div>
        <MenuItems navigate={navigate} setOpen={setOpen} />
      </aside>
    </Fragment>
  );
};
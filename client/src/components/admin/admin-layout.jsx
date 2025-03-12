import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { useState } from "react";

function AdminLayout() {

  const [openSideBar,setOpenSidebar]=useState(false)
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSideBar} setOpen={setOpenSidebar}></AdminSidebar>
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar}></AdminHeader>
        <main className="flex-1 flex-col  p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

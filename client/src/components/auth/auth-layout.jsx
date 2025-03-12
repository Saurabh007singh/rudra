import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
   
      <div className="flex  items-center justify-center bg-background h-screen w-screen relative ">
        <Outlet />
      </div>
    
  );
}

export default AuthLayout;

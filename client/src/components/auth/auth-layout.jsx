import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
   
    <div
    className="flex flex-row h-screen w-screen bg-[url('/images/auth.avif')] bg-no-repeat bg-center justify-center "
    style={{
      background:"",
      backgroundSize: 'cover',
      backgroundPosition: 'right center', // Move the background to the right to simulate a mirror effect
      transition: 'background-position 1s',
      
    }}
  >
    <Outlet />
  </div>
    
  );
}

export default AuthLayout;

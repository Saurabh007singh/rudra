import { logOutUser } from "@/store/auth-slice";
import { FiAlignJustify } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

export const AdminHeader = ({setOpen}) => {
  const dispatch=useDispatch()
  
 function handleLogout(){
dispatch(logOutUser())
}

  return (
    <header className="flex items-center justify-between px-4 py-2  border-b">
      <button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
        <FiAlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button className="inline-flex gap-2 items-center rounded px-4 py-2 text-sm bg-black text-white" onClick={handleLogout}>
          <RiLogoutBoxLine />
          Logout
        </button>
      </div>
    </header>
  );
};

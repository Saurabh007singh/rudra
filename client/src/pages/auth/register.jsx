import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast"



function AuthRegister() {
  const { toast } = useToast()

  const dispatch=useDispatch();
  const navigate=useNavigate();

  // State to store form values
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Handle input changes
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);


  const formData={
    userName, password, email
  }
  // Handle form submission
  const register = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // On success, navigate to login page and show success toast
        navigate("/auth/login");
        toast({
          title: "Success",
          description: "Registration successful",
        })
      } else {
        // On failure, show an error toast
        toast({
          title: "Faliure",
          description: "Couldnt register something went wrong",
        })
      }
    }).catch(() => {
      // In case of unexpected errors, show a generic error toast
      toast({
        title: "Faliure",
        description: "Couldnt register something went wrong",
      })
    });
    
  
  };

  return (
    <>
      
      <div className="absolute bg-pink-500 rounded-lg">
        <div className="flex flex-col items-center justify-center w-[330px] h-[100px]  bg-white bg-opacity-25 rounded-t-lg">
          <p className="text-white text-opacity-65 text-center font-extrabold text-3xl">
            Welcome <br /> to Rudra
          </p>
        </div>
        <form
          onSubmit={register} // Handle form submission
          className="flex flex-col items-center gap-4 w-[330px] h-[300px] bg-white bg-opacity-50 rounded-b-lg shadow-lg"
        >
          <p className="mt-4 text-white text-opacity-65 text-2xl">Register Now</p>
          <div className="flex items-center gap-2">
            <FaUserAlt className="opacity-60 text-white text-2xl" />
            <input
              value={userName} // Controlled input
              onChange={handleUserNameChange} // Handle change
              className="text-center rounded-xl border-none opacity-60"
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <FaLock className="opacity-60 text-white text-2xl" />
            <input
              type="password"
              value={password} // Controlled input
              onChange={handlePasswordChange} // Handle change
              className="text-center rounded-xl border-none opacity-60"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <MdMarkEmailUnread className="opacity-60 text-white text-2xl" />
            <input
              type="email"
              value={email} // Controlled input
              onChange={handleEmailChange} // Handle change
              className="text-center rounded-xl border-none opacity-60"
              placeholder="Enter Email"
              required
            />
          </div>
          <button
            
            type="submit" // Button type should be submit to trigger form submission
            className="bg-white rounded-lg opacity-60 p-1 px-3 text-[14px] font-bold text-slate-500"
          >
            Register
          </button>
          <div className="flex flex-col items-center text-blue-700"><span>Already Having An Account?</span><span><Link to="/auth/login">Login</Link></span></div>
        </form>
      </div>
    </>
  );
}

export default AuthRegister;


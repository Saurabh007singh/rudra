import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function AuthRegister() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to store form values
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Handle input changes
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const formData = {
    userName,
    password,
    email,
  };

  // Handle form submission
  const register = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          // On success, navigate to login page and show success toast
          navigate("/auth/login");
          toast({
            title: "Success",
            description: "Registration successful",
          });
        } else {
          // On failure, show an error toast
          toast({
            title: "Failure",
            description: "Could not register, something went wrong",
          });
        }
      })
      .catch(() => {
        // In case of unexpected errors, show a generic error toast
        toast({
          title: "Failure",
          description: "Could not register, something went wrong",
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen  opacity-90 ">
      <div className=" bg-white rounded-lg shadow-lg p-6 w-[400px] h-[600px] ">
        {/* Header Section */}
        <div className="text-center mb-6">
          <img src="/images/rudra.png" alt="rudra" />
          <p className="text-gray-500 mt-2">Create your account to get started</p>
        </div>

        {/* Form Section */}
        <form onSubmit={register} className="flex flex-col gap-4">
          {/* Username Field */}
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <FaUserAlt className="text-gray-500 text-xl" />
            <input
              value={userName}
              onChange={handleUserNameChange}
              className="flex-1 p-2 text-gray-700 focus:outline-none"
              placeholder="Enter Username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <FaLock className="text-gray-500 text-xl" />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="flex-1 p-2 text-gray-700 focus:outline-none"
              placeholder="Enter Password"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <MdMarkEmailUnread className="text-gray-500 text-xl" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="flex-1 p-2 text-gray-700 focus:outline-none"
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-blue-600">
          <span>Already have an account?</span>
          <Link to="/auth/login" className="ml-1 font-semibold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;

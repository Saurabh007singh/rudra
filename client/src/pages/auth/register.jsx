import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

function AuthRegister() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate =useNavigate();
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
    e.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        console.log(data)
        if (data?.payload?.success) {
        navigate("/auth/login")
          toast({
            title: "Success",
            description: "Registration successful! Please log in.",
          });
        } else {
          // On failure, show an error toast
          toast({
            title: "Failure",
            description: data.payload.message,
          });
        }
      })
      .catch(() => {
        // In case of unexpected errors, show a generic error toast
        toast({
          title: "Failure",
          description: "Something went wrong. Please try again later.",
        });
      });
  };

  return (
    <div className="flex justify-center items-center opacity-90">
      <div className="w-[400px] h-[600px] bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <img src="/images/rudra.png" alt="rudra" />
          <p className="text-gray-500 mt-2">Register to continue</p>
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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { loginUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

function AuthLogin() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // State to store form values
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Handle input changes
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const formData = {
    userName,
    password,
  };

  // Handle form submission
  const register = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          // On success, navigate to login page and show success toast
          toast({
            title: "Success",
            description: "Login successful",
          });
        } else {
          // On failure, show an error toast
          toast({
            title: "Failure",
            description: "Login failed",
          });
        }
      })
      .catch(() => {
        // In case of unexpected errors, show a generic error toast
        toast({
          title: "Failure",
          description: "Login failed",
        });
      });
  };

  return (
    <div className="flex justify-center items-center opacity-90 ">
      <div className="w-[400px] h-[600px]  bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <img src="/images/rudra.png" alt="rudra" />
          <p className="text-gray-500 mt-2">Login to continue</p>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4 text-blue-600">
          <span>Not Having An Account?</span>
          <Link to="/auth/register" className="ml-1 font-semibold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;

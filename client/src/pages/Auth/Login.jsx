import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, BarChart3 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center items-center p-12">

        <BarChart3 size={80} />

        <h1 className="text-5xl font-bold mt-8">
          Excel Analytics
        </h1>

        <p className="text-xl mt-6 text-center max-w-md text-blue-100">
          Upload Excel files, visualize insights and manage analytics through one modern dashboard.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex-1 bg-slate-100 flex items-center justify-center px-6">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

          <h2 className="text-4xl font-bold text-slate-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Login to continue.
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="font-semibold">
                Email
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">

                <Mail
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">

                <Lock
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-bold ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
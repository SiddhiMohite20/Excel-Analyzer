import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  FileSpreadsheet,
  Sparkles,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#08090d] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <section className="relative hidden overflow-hidden lg:flex">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#100b1c] via-[#15102a] to-[#090b12]" />

          {/* Purple Glow */}
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

          {/* Cyan Glow */}
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:45px_45px]" />

          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-10 xl:px-16">

            {/* Brand */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <FileSpreadsheet size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight">
                  Excel <span className="text-violet-400">Analytics</span>
                </p>

                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Smart data workspace
                </p>
              </div>

            </div>

            {/* Main Content */}
            <div className="max-w-xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                <Sparkles size={13} />
                Start your analytics journey
              </div>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Create your
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  smart data workspace.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Create your account and start exploring spreadsheets,
                generating insights and visualizing your data in one place.
              </p>

              {/* Features */}
              <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">

                  <div className="flex items-center gap-2 text-violet-300">
                    <BarChart3 size={16} />
                    <span className="text-xs font-medium">
                      Smart Analytics
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                    Turn spreadsheet data into useful visual insights.
                  </p>

                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">

                  <div className="flex items-center gap-2 text-cyan-300">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-medium">
                      Simple Workspace
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                    Keep your analytics workflow simple and organized.
                  </p>

                </div>

              </div>

            </div>

            {/* Footer */}
            <p className="text-xs text-zinc-600">
              Excel Analytics • Smart spreadsheet insights
            </p>

          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0d12] px-5 py-8 sm:px-8 lg:px-12">

          {/* Glow */}
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-md">

            {/* Register Card */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

              {/* Header */}
              <div className="mb-7">

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                  <Sparkles size={18} />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Create account
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Join the Excel Analytics workspace.
                </p>

              </div>

              <form
                onSubmit={handleRegister}
                className="space-y-5"
              >

                {/* Name */}
                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-400">
                    Full name
                  </label>

                  <div className="group flex items-center rounded-xl border border-zinc-800 bg-black/20 transition-all duration-200 focus-within:border-violet-500/50 focus-within:bg-violet-500/[0.03] focus-within:ring-2 focus-within:ring-violet-500/10">

                    <div className="pl-3.5 text-zinc-600 transition-colors duration-200 group-focus-within:text-violet-400">
                      <User size={17} />
                    </div>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 w-full bg-transparent px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                      required
                    />

                  </div>

                </div>

                {/* Email */}
                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-400">
                    Email address
                  </label>

                  <div className="group flex items-center rounded-xl border border-zinc-800 bg-black/20 transition-all duration-200 focus-within:border-violet-500/50 focus-within:bg-violet-500/[0.03] focus-within:ring-2 focus-within:ring-violet-500/10">

                    <div className="pl-3.5 text-zinc-600 transition-colors duration-200 group-focus-within:text-violet-400">
                      <Mail size={17} />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 w-full bg-transparent px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                      required
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-400">
                    Password
                  </label>

                  <div className="group flex items-center rounded-xl border border-zinc-800 bg-black/20 transition-all duration-200 focus-within:border-violet-500/50 focus-within:bg-violet-500/[0.03] focus-within:ring-2 focus-within:ring-violet-500/10">

                    <div className="pl-3.5 text-zinc-600 transition-colors duration-200 group-focus-within:text-violet-400">
                      <Lock size={17} />
                    </div>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 w-full bg-transparent px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="mr-2 rounded-lg p-2 text-zinc-600 transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-300"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-violet-900/40"
                >
                  Create account

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Login */}
              <div className="mt-7 border-t border-white/5 pt-6 text-center">

                <p className="text-sm text-zinc-500">
                  Already have an account?

                  <Link
                    to="/"
                    className="ml-2 font-semibold text-violet-400 transition-colors duration-200 hover:text-violet-300"
                  >
                    Sign in
                  </Link>
                </p>

              </div>

            </div>

            <p className="mt-5 text-center text-[11px] text-zinc-700">
              Create your Excel Analytics workspace
            </p>

          </div>
        </section>

      </div>

    </div>
  );
}

export default Register;
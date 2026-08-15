import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BarChart3,
  Sparkles,
  ArrowRight,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

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
    <div className="min-h-screen overflow-hidden bg-[#08090d] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE - BRANDING
        ====================================================== */}
        <section className="relative hidden overflow-hidden lg:flex">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#100b1c] via-[#15102a] to-[#090b12]" />

          {/* Purple Glow */}
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

          {/* Cyan Glow */}
          <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:45px_45px]" />

          {/* Content */}
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

              {/* Small badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                <Sparkles size={13} />
                Turn spreadsheets into insights
              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/20">
                  <BarChart3 size={30} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Your data.
                  </p>

                  <p className="text-sm font-medium text-zinc-300">
                    Your insights.
                  </p>
                </div>

              </div>

              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Make your
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  Excel data smarter.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Upload spreadsheets, explore your data, discover useful
                patterns and turn raw rows into meaningful visual insights.
              </p>

              {/* Feature cards */}
              <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-violet-300">
                    <BarChart3 size={16} />
                    <span className="text-xs font-medium">
                      Interactive Analytics
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                    Explore charts and statistics from uploaded files.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-medium">
                      Simple & Secure
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                    Manage your spreadsheet workflow from one dashboard.
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
            RIGHT SIDE - LOGIN
        ====================================================== */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0d12] px-5 py-8 sm:px-8 lg:px-12">

          {/* Right-side glow */}
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-md">

            {/* Login Card */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

              {/* Top */}
              <div className="mb-7">

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                  <Sparkles size={18} />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Welcome back
                  <span className="ml-2">👋</span>
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Sign in to continue to your analytics workspace.
                </p>

              </div>

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >

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
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
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

                {/* Login button */}
                <button
                  type="submit"
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-violet-900/40"
                >
                  Sign in
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Register */}
              <div className="mt-7 border-t border-white/5 pt-6 text-center">

                <p className="text-sm text-zinc-500">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="ml-2 font-semibold text-violet-400 transition-colors duration-200 hover:text-violet-300"
                  >
                    Create one
                  </Link>
                </p>

              </div>

            </div>

            {/* Small footer */}
            <p className="mt-5 text-center text-[11px] text-zinc-700">
              Access your Excel Analytics workspace
            </p>

          </div>
        </section>

      </div>

    </div>
  );
}

export default Login;
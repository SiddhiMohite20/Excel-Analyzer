import {
  LayoutDashboard,
  Upload,
  BarChart3,
  History,
  User,
  Settings,
  LogOut,
  X,
  FileSpreadsheet,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu =
    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300";

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-zinc-800 bg-[#101011] text-white shadow-2xl shadow-black/30 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">

          <div className="flex items-center gap-3">

            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
              <FileSpreadsheet size={21} strokeWidth={1.8} />
            </div>

            {/* Logo Text */}
            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                Excel <span className="text-red-500">Analytics</span>
              </h1>

              <p className="mt-0.5 text-[11px] text-zinc-500">
                Data Dashboard
              </p>
            </div>

          </div>

          {/* Mobile Close */}
          <button
            className="rounded-lg p-2 text-zinc-500 transition-colors duration-200 hover:bg-zinc-800 hover:text-white lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={19} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5">

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "border border-red-900/40 bg-red-950/50 text-red-400 shadow-sm shadow-red-950/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard
                  size={19}
                  strokeWidth={isActive ? 2 : 1.7}
                  className={
                    isActive
                      ? "text-red-400"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-300"
                  }
                />

                <span>Dashboard</span>
              </>
            )}
          </NavLink>

          {/* Upload */}
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "border border-red-900/40 bg-red-950/50 text-red-400 shadow-sm shadow-red-950/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Upload
                  size={19}
                  strokeWidth={isActive ? 2 : 1.7}
                  className={
                    isActive
                      ? "text-red-400"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-300"
                  }
                />

                <span>Upload</span>
              </>
            )}
          </NavLink>

          {/* Analytics */}
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "border border-red-900/40 bg-red-950/50 text-red-400 shadow-sm shadow-red-950/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <BarChart3
                  size={19}
                  strokeWidth={isActive ? 2 : 1.7}
                  className={
                    isActive
                      ? "text-red-400"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-300"
                  }
                />

                <span>Analytics</span>
              </>
            )}
          </NavLink>

          {/* History */}
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "border border-red-900/40 bg-red-950/50 text-red-400 shadow-sm shadow-red-950/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <History
                  size={19}
                  strokeWidth={isActive ? 2 : 1.7}
                  className={
                    isActive
                      ? "text-red-400"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-300"
                  }
                />

                <span>History</span>
              </>
            )}
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "border border-red-900/40 bg-red-950/50 text-red-400 shadow-sm shadow-red-950/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <User
                  size={19}
                  strokeWidth={isActive ? 2 : 1.7}
                  className={
                    isActive
                      ? "text-red-400"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-300"
                  }
                />

                <span>Profile</span>
              </>
            )}
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "border border-red-900/40 bg-red-950/50 text-red-400 shadow-sm shadow-red-950/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  size={19}
                  strokeWidth={isActive ? 2 : 1.7}
                  className={
                    isActive
                      ? "text-red-400"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-300"
                  }
                />

                <span>Settings</span>
              </>
            )}
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="border-t border-zinc-800 p-3">

          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-500 transition-all duration-300 hover:bg-red-950/30 hover:text-red-400"
          >
            <LogOut
              size={19}
              strokeWidth={1.8}
              className="text-zinc-500 transition-colors duration-300 group-hover:text-red-400"
            />

            <span>Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;
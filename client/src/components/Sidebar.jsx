import {
  LayoutDashboard,
  Upload,
  BarChart3,
  History,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu =
    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300";

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-40 h-screen w-72 bg-slate-900 text-white flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">

          <div>
            <h1 className="text-2xl font-bold text-blue-400">
              Excel Analytics
            </h1>

            <p className="text-xs text-gray-400">
              Dashboard
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>

        </div>

        {/* Menu */}
        <nav className="flex-1 p-5 space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <Upload size={20} />
            Upload
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <BarChart3 size={20} />
            Analytics
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <History size={20} />
            History
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <User size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <Settings size={20} />
            Settings
          </NavLink>

        </nav>

        <div className="p-5 border-t border-slate-700">

          <button
  onClick={handleLogout}
  className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-slate-800 hover:text-red-400 transition-all duration-300"
>
  <LogOut size={20} className="text-red-400" />
  Logout
</button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
import { useEffect, useState } from "react";
import {
  Menu,
  Bell,
  UserCircle,
  ChevronDown,
} from "lucide-react";

function Navbar({ setOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-zinc-800 bg-[#111113] px-5 md:px-8">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl p-2 text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-white lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-0.5 text-xs text-zinc-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Notification */}
        <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400">
          <Bell
            size={18}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:scale-110"
          />

          {/* Notification Dot */}
          <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-violet-500" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-zinc-800 sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
            <UserCircle
              size={21}
              strokeWidth={1.7}
            />
          </div>

          {/* User Info */}
          <div className="hidden sm:block">
            <p className="max-w-[150px] truncate text-sm font-medium text-zinc-200">
              {user?.name || "User"}
            </p>

            <p className="mt-0.5 text-[11px] text-zinc-500">
              Excel Analytics User
            </p>
          </div>

          {/* Dropdown Icon */}
          <ChevronDown
            size={15}
            className="hidden text-zinc-600 sm:block"
          />

        </div>

      </div>
    </header>
  );
}

export default Navbar;
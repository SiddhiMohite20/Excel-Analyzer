import { useEffect, useState } from "react";
import { Menu, Bell, UserCircle } from "lucide-react";

function Navbar({ setOpen }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="bg-white shadow-sm h-20 px-6 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            {new Date().toDateString()}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-6">

        <Bell className="text-gray-500" />

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <h2 className="font-semibold">
              {user?.name}
            </h2>

            <p className="text-sm text-gray-500">
              Excel Analytics User
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;
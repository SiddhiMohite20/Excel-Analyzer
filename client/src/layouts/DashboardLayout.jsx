import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0b0d]">

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar setOpen={setOpen} />

        <main className="flex-1 overflow-auto px-5 py-6 md:px-8 md:py-7">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;